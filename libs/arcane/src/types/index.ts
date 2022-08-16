/** @format */

export type Logo = {
  url: string;
  description: string;
};

export type App = {
  logo: Logo;
  name: string;
  path: null | string;
};

export type Apps = Array<App>;

interface FragmentProps {
  id?: string;
  src: string;
  async?: boolean;
  primary?: boolean;
  public?: boolean;
  [key: string]: any;
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      fragment: FragmentProps;
    }
  }
}
