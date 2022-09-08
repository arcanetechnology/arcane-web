/** @format */

// USER TYPE
export type User = {
  id: string;
  email: string;
};

export type TradeUser = {
  profiles: Array<Profile>;
} & User;

// PROFILE
export type ProfileTypes = 'BUSINESS' | 'PERSONAL';

export type Profile = {
  id: string;
  alias: string;
  type: ProfileTypes;
  accounts: Array<Account>;
};

// ACCOUNTS

export type Currency = 'USD' | 'EUR' | 'GBP' | 'NOK' | 'SEK' | 'DKK' | 'CHF';

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

export type CryptoCurrency = string;

export type CryptoAccount = {
  id: string;
  alias: string;
  currency: CryptoCurrency;
  balance: number;
};
