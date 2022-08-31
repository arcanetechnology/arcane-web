/** @format */

import { useSelector } from 'react-redux';
import { CurrencyTypes, TransactionAccount } from '../../types';
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
  accounts: Array<TransactionAccount>,
  currency: CurrencyTypes,
  accountIds: Array<string>
) => {
  // TODO: @vihang filter implementation
  return accounts;
};
