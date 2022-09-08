/** @format */
import { User, Currency, CryptoCurrency } from './api';

export type TradeUserData = User;

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
