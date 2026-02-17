/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ENABLE_BACKEND?: string;
  readonly VITE_ENABLE_KETCHER?: string;
  readonly VITE_KETCHER_MODE?: string;
  readonly VITE_KETCHER_API_PATH?: string;
  readonly VITE_KETCHER_STATIC_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
