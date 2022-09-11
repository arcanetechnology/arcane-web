/** @format */

import { Currency, CryptoCurrency, ProfileTypes } from './entities';

// flattened profile state
export type ProfileState = {
  id: string;
  alias: string;
  type: ProfileTypes;
  accounts: Array<string>;
};

export type AccountState = {
  id: string;
  alias: string;
  currency: Currency;
  balance: number;
  portfolios: Array<string>;
};

export type PortfolioState = {
  id: string;
  alias: string;
  cryptoAccounts: Array<string>;
};

// actions

export type AccountTypes = 'Fiat' | 'Crypto' | 'Virtual';
export type Loading = 'idle' | 'loading' | 'fetched';
export type Status = 'draft' | 'published';

export type Operation = {
  id: string;
  account: string;
  amount: number;
};

export type CurrencyGroup = {
  id: string;
  operations: Array<string>;
  currency: Currency | CryptoCurrency;
};

export type AccountOption = {
  id: string;
  label: string;
  balance: number;
  currency: string;
  type: AccountTypes;
};

export type UserTransaction = {
  id: string;
  status: Status;
  name: string;
  groups: Array<string>;
};
