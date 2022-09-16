/** @format */

export const profileTypes = ['BUSINESS', 'PERSONAL'] as const;
export type ProfileTypes = typeof profileTypes[number];

export type User = {
  id: string;
  email: string;
  profiles: Array<string>;
};

export type Profile = {
  id: string;
  type: ProfileTypes;
  accounts: Array<string>;
};

export type Portfolio = {
  id: string;
  alias: string;
  accounts: Array<string>;
};
