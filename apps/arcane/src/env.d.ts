/** @format */

interface ImportMetaEnv {
  readonly ARCANE_WEB_GCP_PROJECT_ID: string;
  readonly ARCANE_WEB_APPLICATION_NAME: string;
  readonly ARCANE_CONTENTFUL_SPACE: string;
  readonly ARCANE_CONTENTFUL_ENV: string;
  readonly ARCANE_CONTENTFUL_ACCESS_TOKEN: string;
  readonly ARCANE_CONTENTFUL_LEGAL_SPACE: string;
  readonly ARCANE_CONTENTFUL_LEGAL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
