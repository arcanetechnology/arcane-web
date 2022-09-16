/** @format */

import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { Transaction, UserTransaction } from '../../types';

const adapter = createEntityAdapter<UserTransaction>({
  selectId: (user) => user.id,
});
let transactions = adapter.getInitialState();

transactions = adapter.setAll(transactions, []);

export default transactions;
