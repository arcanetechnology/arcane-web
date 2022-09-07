/** @format */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './state';
import { CurrencyGroup } from '../types';

// can contain global data for all operations in it.
const currencyGroupsAdapter = createEntityAdapter<CurrencyGroup>({
  selectId: (currencyGroup) => currencyGroup.currency,
});

const currencyGroupsSlice = createSlice({
  name: 'currencyGroups',
  initialState: currencyGroupsAdapter.getInitialState(),
  reducers: {
    currencyGroupAdded: currencyGroupsAdapter.addOne,
    currencyGroupUpdated: currencyGroupsAdapter.updateOne,
    currencyGroupOperationAdded: (
      state,
      action: PayloadAction<{ currency: string; operation: string }>
    ) => {
      const operations = [
        ...(state.entities[action.payload.currency]?.operations || []),
        action.payload.operation,
      ];
      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.currency,
        changes: { operations },
      });
    },

    currencyGroupOperationDeleted: (
      state,
      action: PayloadAction<{ currency: string; operation: string }>
    ) => {
      const operations: string[] =
        state.entities[action.payload.currency]?.operations.filter(
          (o) => o !== action.payload.operation
        ) || [];
      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.currency,
        changes: { operations },
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
