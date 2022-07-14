/** @format */

interface TailorFragmentElement {
  id?: string;
  src: string;
  primary?: boolean;
  timeout?: number;
  async?: boolean;
  public?: boolean;
  'fallback-src'?: string;
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      fragment: TailorFragmentElement;
    }
  }
}
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
