/** @format */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Operation } from '../types';
import { RootState } from './state';

const operationsAdapter = createEntityAdapter<Operation>({
  selectId: (operation) => operation.id,
});

const operationSlice = createSlice({
  name: 'operations',
  initialState: operationsAdapter.getInitialState(),
  reducers: {
    // filter accounts
    operationAdded: operationsAdapter.addOne,
    operationUpdated: operationsAdapter.updateOne,
    operationDeleted: operationsAdapter.removeOne,
  },
});

export default operationSlice.reducer;

export const { operationAdded, operationDeleted, operationUpdated } =
  operationSlice.actions;

export const operationsSelector = operationsAdapter.getSelectors(
  (s: RootState) => s.operations
);

// User => fetch accounts => transform accounts to transaction app =>
