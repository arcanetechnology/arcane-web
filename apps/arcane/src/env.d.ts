/** @format */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_SPACE: string;
  readonly VITE_CONTENTFUL_ENVIRONMENT: string;
  readonly VITE_PLATFORM_CONTENTFUL_SPACE: string;
  readonly VITE_PLATFORM_CONTENTFUL_ACCESS_TOKEN: string;
  readonly VITE_BACKEND: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_GTAG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'solid-start-static';

declare module 'rollup-plugin-external-globals';
