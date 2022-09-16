/** @format */
export const accountTypes = ['stakeholder', 'custody', 'virtual'];
export type AccountTypes = typeof accountTypes[number];

export type Account = {
  id: string;
  alias: string;
  balance: number;
  custodyAccountId: string;
};

export type FiatAccount = Account;
export type CryptoAccount = Account;
