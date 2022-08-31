/** @format */

// USER TYPE

export type User = {
  id: string;
  email: string;
  name: string;
  profiles: Array<Profile>;
};

// PROFILE
export type ProfileTypes = 'BUSINESS' | 'PERSONAL';

export type Profile = {
  type: ProfileTypes;
  id: string;
  accounts: Array<Account>;
};

// ACCOUNTS

export type CurrencyTypes =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'NOK'
  | 'SEK'
  | 'DKK'
  | 'CHF';

export type Account = {
  id: string;
  currencyType: CurrencyTypes;
  portfolios: Array<PortFolio>;
  balance: number;
};

// PORTFOLIO

export type PortFolio = {
  id: string;
  cryptos: Array<Crypto>;
};

// crypto

export type Crypto = {
  id: string;
};

/**
 *  Transaction App Types
 */

// actions

export type OperationStatus = 'draft' | 'added';
export type AccountTypes = 'Fiat' | 'Crypto';

export type Operation = {
  id: string;
  status: OperationStatus;
  accounts: Array<string>;
  account: string;
  amount: number;
};

export type Section = {
  id: string;
  operations: Array<string>;
};

export type TransactionAccount = {
  id: string;
  label: string;
  balance: number;
  currency: string;
  type: AccountTypes;
};

/**
 * generic types
 */

export type Loading = 'idle' | 'loading' | 'fetched';
