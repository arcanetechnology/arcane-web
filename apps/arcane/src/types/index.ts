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
