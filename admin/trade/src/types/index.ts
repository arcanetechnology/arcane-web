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

export type Currency =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'NOK'
  | 'SEK'
  | 'DKK'
  | 'CHF';

export type Account = {
  id: string;
  alias: string;
  currency: Currency;
  balance: number;
  portfolios: Array<PortFolio>;
};

// PORTFOLIO

export type PortFolio = {
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

/**
 *  Transaction App Types
 */

// actions

export type OperationStatus = 'draft' | 'added';
export type AccountTypes = 'Fiat' | 'Crypto';

export type Operation = {
  status: OperationStatus;
  account: string;
  amount: number;
};

export type CurrencyGroup = {
  operations: Array<string>;
  currency: Currency | CryptoCurrency;
};

export type AccountOptions = {
  id: string;
  label: string;
  balance: number;
  currency: string;
  type: AccountTypes;
};

export type Transaction = {
  id: string;
  groups: Array<CurrencyGroup>;
};

/**
 * generic types
 */

export type Loading = 'idle' | 'loading' | 'fetched';
