import {
  ChemicalMimeType,
  CalculateResult,
  InfoResult,
  StructService,
  StructServiceOptions,
  StructServiceProvider,
} from "ketcher-core";

const EMPTY_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wf6l5kAAAAASUVORK5CYII=";

const withFormat = (struct: string, format?: ChemicalMimeType) => ({
  struct,
  format: format ?? ChemicalMimeType.KET,
});

const EMPTY_CALCULATE_RESULT: CalculateResult = {
  "molecular-weight": "",
  "most-abundant-mass": "",
  "monoisotopic-mass": "",
  gross: "",
  "mass-composition": "",
};

const createLocalStructService = (): StructService => ({
  info: async (): Promise<InfoResult> => ({
    indigoVersion: "local-offline",
    imagoVersions: [],
    isAvailable: true,
  }),
  convert: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  layout: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  clean: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  aromatize: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  dearomatize: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  calculateCip: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  automap: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
  check: async () => ({}),
  calculate: async (data: any) => {
    const result: CalculateResult = { ...EMPTY_CALCULATE_RESULT };
    const properties: string[] = Array.isArray(data?.properties) ? data.properties.map((prop: unknown) => String(prop)) : [];
    for (const prop of properties) {
      if (prop in result) {
        result[prop as keyof CalculateResult] = "";
      }
    }
    return result;
  },
  recognize: async () => {
    throw new Error("本地离线模式不支持图片识别。");
  },
  getInChIKey: async () => "",
  generateImageAsBase64: async () => EMPTY_PNG_BASE64,
  toggleExplicitHydrogens: async (data: any) => withFormat(data?.struct ?? "", data?.output_format),
});

class LocalStructServiceProvider implements StructServiceProvider {
  mode: "standalone" = "standalone";

  createStructService(_: StructServiceOptions): StructService {
    return createLocalStructService();
  }
}

export const createLocalStructServiceProvider = (): StructServiceProvider => new LocalStructServiceProvider();
