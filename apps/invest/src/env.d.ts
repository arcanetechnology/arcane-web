/** @format */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APPLICATION_NAME: string;
  readonly ARCANE_APPLICATION_ID: string;
  readonly INVEST_CONTENTFUL_SPACE: string;
  readonly INVEST_CONTENTFUL_ACCESS_TOKEN: string;
  readonly INVEST_CONTENTFUL_ONBOARDING_ID: string;
  readonly INVEST_CONTENTFUL_ENVIRONMENT: string;
  readonly ARCANE_WEB_API_KEY: string;
  readonly ARCANE_WEB_AUTH_DOMAIN: string;
  readonly ARCANE_PROJECT_ID: string;
  readonly ARCANE_STORAGE_BUCKET: string;
  readonly ARCANE_MESSAGE_SENDER_ID: string;
  readonly ARCANE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
