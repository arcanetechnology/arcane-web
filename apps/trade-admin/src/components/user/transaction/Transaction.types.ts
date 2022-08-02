/** @format */

import { CryptoCurrency, FiatCurrency } from '../../../types';

export type SearchAbleAccounts = SearchAbleAccountsRead &
  SearchAbleAccountsWrite;

export type OptionalSearchAbleAccountsRead = {
  profileAlias: string;
  profileType: string;
  portfolioAlias: string;
  cryptoAlias: string;
  cryptoCurrency: CryptoCurrency;
};

export type SearchAbleAccountsRead = {
  accountAlias: string;
  accountCurrency: FiatCurrency;
} & Partial<OptionalSearchAbleAccountsRead>;

export type OptionalSearchAbleAccountsWrite = {
  cryptoAccountId: string;
};

export type SearchAbleAccountsWrite = {
  accountId: string;
} & Partial<OptionalSearchAbleAccountsWrite>;

export type Transaction = {
  id: string;
  accountId: string;
  amount: string;
  currency: string;
};

export type Transactions = Array<Transaction>;

export type Operation = {
  id: string;
  transactions: Transactions;
};

export type Operations = Array<Operation>;
