/** @format */

export const profileTypes = ['BUSINESS', 'PERSONAL'] as const;
export type ProfileTypes = typeof profileTypes[number];
export const accountTypes = ['stakeholder', 'custody', 'virtual'];
export type AccountTypes = typeof accountTypes[number];
export const currency = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK', 'CHF'];
export type Currency = typeof currency[number];
// perhaps update this with specific crypto types.
export type CryptoCurrency = string;

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

type Account = {
  id: string;
  alias: string;
  balance: number;
  custodyAccountId: string;
};

type FiatAccount = {
  portfolio: Array<string>;
  currency: Currency;
} & Account;

export type StakeholderFiatAccount = FiatAccount;

export type Portfolio = {
  id: string;
  alias: string;
  accounts: Array<string>;
};

type CryptoAccount = {
  currency: CryptoCurrency;
} & Account;

export type StakeholderCryptoAccount = CryptoAccount;
