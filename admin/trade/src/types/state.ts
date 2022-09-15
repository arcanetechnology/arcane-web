/** @format */

import exp from 'constants';
import { Currency, CryptoCurrency, ProfileTypes, User } from './entities';

export type UserState = {
  profiles: Array<string>;
} & User;

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

export type AccountTypes = 'Fiat' | 'Crypto' | 'Virtual' | 'Custody';

export type CurrencyTyps = 'Fiat' | 'Crypto';
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
  total: number;
  custodyTotal: number;
};

// type only on frontend to manage accounts for transactions
export type AccountOption = {
  id: string;
  label: string;
  currency: string;
  type: AccountTypes;
} & Partial<StakeholderAccountOptions> &
  Partial<VirtualAccountOptions>;

export type StakeholderAccountOptions = {
  balance: number;
  custodyAccountId: string;
};

export type VirtualAccountOptions = {
  allowNegative: boolean;
};

export type UserTransaction = {
  id: string;
  status: Status;
  name: string;
  groups: Array<string>;
};


