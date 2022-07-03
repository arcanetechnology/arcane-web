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
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_DATABASE_URL: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
