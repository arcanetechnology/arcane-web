/** @format */

import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserTransaction } from '../../types';

export const transactionAdapter = createEntityAdapter<UserTransaction>({
  selectId: (transaction) => transaction.id,
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactionAdapter.getInitialState(),
  reducers: {
    transactionAdded: transactionAdapter.addOne,
    transactionUpdated: transactionAdapter.updateOne,
    transactionDeleted: transactionAdapter.removeOne,
    transactionGroupAdded: (
      state,
      action: PayloadAction<{ id: string; group: string }>
    ) => {
      const groups = [
        ...(state.entities[action.payload.id]?.groups || []),
        action.payload.group,
      ];
      return transactionAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { groups },
      });
    },

    transactionGroupDeleted: (
      state,
      action: PayloadAction<{ id: string; group: string }>
    ) => {
      const groups: string[] =
        state.entities[action.payload.id]?.groups.filter(
          (g) => g !== action.payload.group
        ) || [];
      return transactionAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { groups },
      });
    },
  },
});

export default transactionSlice;

export const {
  transactionAdded,
  transactionUpdated,
  transactionDeleted,
  transactionGroupAdded,
  transactionGroupDeleted,
} = transactionSlice.actions;
