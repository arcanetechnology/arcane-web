/** @format */

import { useSelector } from 'react-redux';
import {
  CryptoCurrencyTypes,
  CurrencyTypes,
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
  selectedCurrency: CurrencyTypes | CryptoCurrencyTypes | null = null,
  excludedAccountIds: Array<string> = [],
  excludedCurrencies: Array<CurrencyTypes | CryptoCurrencyTypes> = []
) => {
  // TODO: @vihang filter implementation
  return accounts;
};

export const getAccount = (accounts: Array<AccountOptions>, id: string) => {
  const account = accounts.find((a) => a.id === id);
  if (account) {
    return account;
  } else {
    throw new Error('account not found');
  }
};
