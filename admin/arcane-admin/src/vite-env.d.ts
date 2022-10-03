/** @format */

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_GOOGLE_TENANT_ID: string;
  readonly VITE_SAML_PROVIDER_ID: string;

  // application specific environment variables
  readonly VITE_BASE_URL: string;
  readonly VITE_ADMIN_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
