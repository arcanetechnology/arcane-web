/** @format */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_CONTENTFUL_SPACE: string;
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string;
  readonly VITE_CONTENTFUL_ONBOARDING_ID: string;
  readonly VITE_CONTENTFUL_ENVIRONMENT: string;
  readonly VITE_PLATFORM_CONTENTFUL_SPACE: string;
  readonly VITE_PLATFORM_CONTENTFUL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
