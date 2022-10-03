/** @format */
export const getEntireUrl =
  (base: string = '') =>
  (...urls: Array<string>) =>
    `${base}${urls.join('/')}`;
