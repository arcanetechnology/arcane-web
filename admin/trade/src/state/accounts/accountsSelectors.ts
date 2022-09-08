/** @format */

import { useSelector } from 'react-redux';
import {
  CryptoCurrency,
  Currency,
  AccountOptions,
} from '../../types';
import { RootState } from '../state';
import { accountsAdapter } from './accounts';

export const accountsSelector = accountsAdapter.getSelectors(
  (s: RootState) => s.accounts
);

export const getAccounts = (ids: string[]) => {
  const allAccounts = useSelector(accountsSelector.selectAll);
  const accounts = Object.values(allAccounts).filter(({ id }) =>
    ids.some((i) => id.includes(i))
  );
  return accounts;
};

export const getAccountOptions = (
  accounts: Array<AccountOptions>,
  selectedCurrency: Currency | CryptoCurrency | null = null,
  excludedAccountIds: Array<string> = [],
  excludedCurrencies: Array<Currency | CryptoCurrency> = []
) => {
  return accounts
    // if selectedCurrency is present, filter accountOptions by selected selectedCurrency
    .filter((accountOption) => selectedCurrency == null || accountOption.currency == selectedCurrency)
    // exclude accountOptions with id in excludedAccountIds list
    .filter((accountOption) => !excludedAccountIds.includes(accountOption.id))
    // exclude accountOptions with currency in excludedCurrencies list
    .filter((accountOption) => !excludedCurrencies.includes(accountOption.currency))
};

export const getAccount = (accounts: Array<AccountOptions>, id: string) => {
  const account = accounts.find((a) => a.id === id);
  if (account) {
    return account;
  } else {
    throw new Error('account not found');
  }
};
