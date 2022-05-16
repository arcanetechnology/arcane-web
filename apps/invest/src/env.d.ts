/** @format */

interface ImportMetaEnv {
  readonly ARCANE_WEB_APPLICATION_NAME: string;
  readonly INVEST_CONTENTFUL_SPACE: string;
  readonly INVEST_CONTENTFUL_ACCESS_TOKEN: string;
  readonly INVEST_CONTENTFUL_ONBOARDING_ID: string;
  readonly INVEST_CONTENTFUL_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
