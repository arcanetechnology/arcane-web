/** @format */

import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
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
        },
      });
    },

    currencyGroupOperationDeleted: (
      state,
      action: PayloadAction<{
        id: string;
        operation: string;
        amount: number;
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
    currencyGroupCustodyAdded: (
      state,
      action: PayloadAction<{
        id: string;
        operation: string;
        amount: number;
      }>
    ) => {
      const group = state.entities[action.payload.id];
      if (!group) return;
      const operations: string[] = [
        ...(group.operations ?? []),
        action.payload.operation,
      ];
      const custodyTotal = group.custodyTotal + action.payload.amount;
      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { operations, custodyTotal },
      });
    },

    currencyGroupCustodyDeleted: (
      state,
      action: PayloadAction<{ id: string; operation: string; amount: number }>
    ) => {
      const group = state.entities[action.payload.id];
      if (!group) return;

      const operations: string[] =
        group.operations.filter((o) => o !== action.payload.operation) || [];

      if (operations.length === 0) {
        return currencyGroupsAdapter.removeOne(state, action.payload.id);
      }

      const custodyTotal = group.custodyTotal - action.payload.amount;

      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { operations, custodyTotal },
      });
    },
    currencyGroupCustodyTotalUpdated: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const group = state.entities[action.payload.id];
      if (!group) return;
      const custodyTotal = group.custodyTotal + action.payload.amount;
      return currencyGroupsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          custodyTotal,
        },
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
  currencyGroupCustodyAdded,
  currencyGroupCustodyTotalUpdated,
  currencyGroupCustodyDeleted,
} = currencyGroupsSlice.actions;

export const currencyGroupsSelector = currencyGroupsAdapter.getSelectors(
  (s: RootState) => s.currencyGroups
);
