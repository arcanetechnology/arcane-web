/** @format */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './state';
import { CurrencyGroup } from '../types';

// can contain global data for all operations in it.
const currencyGroupsAdapter = createEntityAdapter<CurrencyGroup>({
  selectId: (currencyGroup) => currencyGroup.id,
});

const currencyGroupsSlice = createSlice({
  name: 'currencyGroups',
  initialState: currencyGroupsAdapter.getInitialState(),
  reducers: {
    currencyGroupAdded: currencyGroupsAdapter.addOne,
    currencyGroupUpdated: currencyGroupsAdapter.updateOne,
    currencyGroupOperationAdded: (
      state,
      action: PayloadAction<{
        id: string;
        currency: string;
        operation: string;
        amount: number;
      }>
    ) => {
      const operations = [
        ...(state.entities[action.payload.id]?.operations || []),
        action.payload.operation,
      ];

      const total = (state.entities[action.payload.id]!.total +
        action.payload.amount) as number;

      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          operations,
          currency: action.payload.currency,
          total,
          custodyTotal: total,
        },
      });
    },

    currencyGroupOperationDeleted: (
      state,
      action: PayloadAction<{
        id: string;
        operation: string;
        amount: number;
        isCustody: boolean;
      }>
    ) => {
      const operations: string[] =
        state.entities[action.payload.id]?.operations.filter(
          (o) => o !== action.payload.operation
        ) || [];

      if (operations.length === 0) {
        return currencyGroupsAdapter.removeOne(state, action.payload.id);
      }

      const total = (state.entities[action.payload.id]!.total -
        action.payload.amount) as number;

      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { operations, total },
      });
    },
    currencyGroupDeleted: currencyGroupsAdapter.removeOne,
  },
});

export default currencyGroupsSlice.reducer;

export const {
  currencyGroupAdded,
  currencyGroupDeleted,
  currencyGroupOperationAdded,
  currencyGroupOperationDeleted,
  currencyGroupUpdated,
} = currencyGroupsSlice.actions;

export const currencyGroupsSelector = currencyGroupsAdapter.getSelectors(
  (s: RootState) => s.currencyGroups
);
