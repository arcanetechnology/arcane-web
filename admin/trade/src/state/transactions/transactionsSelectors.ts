/** @format */

import { RootState } from '../state';
import { transactionAdapter } from './transactions';

export const transactionsSelector = transactionAdapter.getSelectors(
  (s: RootState) => s.transactions
);
