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

export type CryptoCurrencyTypes = string;

export type Crypto = {
  id: string;
  currency: CryptoCurrencyTypes;
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
  currency: CurrencyTypes | CryptoCurrencyTypes;
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
