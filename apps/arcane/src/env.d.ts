/** @format */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PORT: string;
  readonly apiKey: string;
  readonly authDomain: string;
  readonly databaseURL: string;
  readonly storageBucket: string;
  readonly messagingSenderId: string;
  readonly appId: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
