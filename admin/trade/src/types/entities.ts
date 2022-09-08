/** @format */
// PROFILE

export const profileTypes = ['BUSINESS', 'PERSONAL'] as const;
export const currency = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK', 'CHF'];
export type ProfileTypes = typeof profileTypes[number];
export type Currency = typeof currency[number];
export type CryptoCurrency = string;

// USER TYPE
export type User = {
  id: string;
  email: string;
};

export type TradeUser = {
  profiles: Array<Profile>;
} & User;

export type Profile = {
  id: string;
  alias: string;
  type: ProfileTypes;
  accounts: Array<Account>;
};

// ACCOUNTS

export type Account = {
  id: string;
  alias: string;
  currency: Currency;
  balance: number;
  portfolios: Array<Portfolio>;
};

// PORTFOLIO

export type Portfolio = {
  id: string;
  alias: string;
  cryptoAccounts: Array<CryptoAccount>;
};

// crypto

export type CryptoAccount = {
  id: string;
  alias: string;
  currency: CryptoCurrency;
  balance: number;
};
