/** @format */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ARCANE_APPLICATION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
