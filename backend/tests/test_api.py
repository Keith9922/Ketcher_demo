from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_chem_parse_success():
    response = client.post("/api/chem/parse", json={"smiles": "CCO"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["canonical_smiles"] == "CCO"
    assert payload["qc"]["rdkit_parse_ok"]


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


def test_export_invalid_format():
    response = client.get("/api/export", params={"format": "xyz"})
    assert response.status_code == 422
