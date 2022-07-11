/** @format */

/// <reference types="vite/client" />

export declare global {
  interface Window {
    hydration: {
      url: string;
    };
  }
}

interface ImportMetaEnv {
  readonly VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
