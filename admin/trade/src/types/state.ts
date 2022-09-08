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
export type OperationStatus = 'draft' | 'added';
export type AccountTypes = 'Fiat' | 'Crypto' | 'Virtual';
export type Loading = 'idle' | 'loading' | 'fetched';

export type Operation = {
  status: OperationStatus;
  account: string;
  amount: number;
};

export type CurrencyGroup = {
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

export type Transaction = {
  id: string;
  groups: Array<CurrencyGroup>;
};
