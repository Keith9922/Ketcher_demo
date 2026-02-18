import csv
import io

from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_chem_parse_success():
    response = client.post("/api/chem/parse", json={"smiles": "CCO"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["canonical_smiles"] == "CCO"
    assert payload["qc"]["rdkit_parse_ok"]


def test_chem_3d_success():
    response = client.post("/api/chem/3d", json={"smiles": "CCO"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["ok"] is True
    assert payload["molblock_3d"]
    assert "M  END" in payload["molblock_3d"]


def test_task_flow_and_export():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "flow-1", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task = create_resp.json()[0]
    task_id = task["id"]

    claim_resp = client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"})
    assert claim_resp.status_code == 200

    submit_resp = client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": "CC"})
    assert submit_resp.status_code == 200

    review_resp = client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "APPROVED", "comment": "looks good"},
    )
    assert review_resp.status_code == 200

    export_resp = client.get("/api/export", params={"format": "smiles"})
    assert export_resp.status_code == 200
    assert "CC" in export_resp.text


def test_submit_invalid_structure_rejected_by_rdkit():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "invalid-structure", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task = create_resp.json()[0]
    task_id = task["id"]

    claim_resp = client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"})
    assert claim_resp.status_code == 200

    # 非法 SMILES：环闭合不完整
    submit_resp = client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": "C1CC"})
    assert submit_resp.status_code == 400


def test_submit_requires_claim_first():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "submit-needs-claim", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    submit_resp = client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": "CC"})
    assert submit_resp.status_code == 400


def test_submit_requires_same_annotator_as_claimed_user():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "submit-annotator-mismatch", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    claim_resp = client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"})
    assert claim_resp.status_code == 200

    submit_resp = client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "bob", "smiles": "CC"})
    assert submit_resp.status_code == 400


def test_submit_structured_json_allows_manual_review_flow():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "json-structure", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    claim_resp = client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"})
    assert claim_resp.status_code == 200

    ketcher_like_json = """{
      "root": {
        "nodes": [{"$ref": "mol0"}],
        "connections": [],
        "templates": []
      },
      "mol0": {
        "type": "molecule",
        "atoms": [{"label": "C"}, {"label": "O"}],
        "bonds": [{"type": 1, "atoms": [0, 1]}]
      }
    }"""
    submit_resp = client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": ketcher_like_json})
    assert submit_resp.status_code == 200
    submit_payload = submit_resp.json()
    assert submit_payload["status"] == "SUBMITTED"
    assert "manual_review_required_json_payload" in submit_payload["annotation"]["qc"]["warnings"]

    review_resp = client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "APPROVED", "comment": "manual json review passed"},
    )
    assert review_resp.status_code == 200
    assert review_resp.json()["status"] == "APPROVED"


def test_claim_invalid_state_rejected():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "claim-invalid", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    first_claim = client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"})
    assert first_claim.status_code == 200

    second_claim = client.post(f"/api/tasks/{task_id}/claim", json={"user": "bob"})
    assert second_claim.status_code == 400


def test_review_requires_submitted_status():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "review-invalid", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    review_resp = client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "APPROVED", "comment": "not submitted yet"},
    )
    assert review_resp.status_code == 400


def test_review_accepts_lowercase_and_status_alias():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "review-compat", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    claim_resp = client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"})
    assert claim_resp.status_code == 200
    submit_resp = client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": "CC"})
    assert submit_resp.status_code == 200

    # lowercase decision
    review_resp_lower = client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "approved", "comment": "lowercase accepted"},
    )
    assert review_resp_lower.status_code == 200
    assert review_resp_lower.json()["status"] == "APPROVED"

    # reset another task to test alias status field
    create_resp2 = client.post("/api/tasks", json={"items": [{"title": "review-compat-alias", "source_smiles": "CC"}]})
    assert create_resp2.status_code == 201
    task_id2 = create_resp2.json()[0]["id"]
    assert client.post(f"/api/tasks/{task_id2}/claim", json={"user": "alice"}).status_code == 200
    assert client.post(f"/api/tasks/{task_id2}/submit", json={"annotator": "alice", "smiles": "CC"}).status_code == 200

    review_resp_alias = client.post(
        f"/api/tasks/{task_id2}/review",
        json={"reviewer": "bob", "status": "REJECTED", "comment": "status alias accepted"},
    )
    assert review_resp_alias.status_code == 200
    assert review_resp_alias.json()["status"] == "REJECTED"


def test_review_without_comment_is_allowed():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "review-no-comment", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    assert client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"}).status_code == 200
    assert client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": "CC"}).status_code == 200

    review_resp = client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "APPROVED"},
    )
    assert review_resp.status_code == 200
    assert review_resp.json()["status"] == "APPROVED"


def test_export_smiles_does_not_fallback_to_source_for_manual_review_only_records():
    unique_source = "N#N"
    create_resp = client.post("/api/tasks", json={"items": [{"title": "export-no-source-fallback", "source_smiles": unique_source}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    assert client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"}).status_code == 200

    ketcher_like_json = """{
      "root": {"nodes": [{"$ref": "mol0"}], "connections": [], "templates": []},
      "mol0": {"type": "molecule", "atoms": [{"label": "C"}], "bonds": []}
    }"""
    assert client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": ketcher_like_json}).status_code == 200
    assert client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "APPROVED", "comment": "manual approve"},
    ).status_code == 200

    export_resp = client.get("/api/export", params={"format": "smiles"})
    assert export_resp.status_code == 200
    assert unique_source not in export_resp.text


def test_export_csv_escapes_comment_fields():
    create_resp = client.post("/api/tasks", json={"items": [{"title": "csv-escape", "source_smiles": "CC"}]})
    assert create_resp.status_code == 201
    task_id = create_resp.json()[0]["id"]

    assert client.post(f"/api/tasks/{task_id}/claim", json={"user": "alice"}).status_code == 200
    assert client.post(f"/api/tasks/{task_id}/submit", json={"annotator": "alice", "smiles": "CC"}).status_code == 200
    comment = 'line1,with,comma\nline2 "quoted"'
    assert client.post(
        f"/api/tasks/{task_id}/review",
        json={"reviewer": "bob", "decision": "APPROVED", "comment": comment},
    ).status_code == 200

    export_resp = client.get("/api/export", params={"format": "csv"})
    assert export_resp.status_code == 200
    reader = csv.DictReader(io.StringIO(export_resp.text))
    matched = [row for row in reader if row["id"] == task_id]
    assert len(matched) == 1
    assert matched[0]["review_comment"] == comment


def test_export_invalid_format():
    response = client.get("/api/export", params={"format": "xyz"})
    assert response.status_code == 422
