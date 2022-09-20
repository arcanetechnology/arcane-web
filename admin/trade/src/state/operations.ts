/** @format */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Operation } from '../types';
import { RootState, useTradeSelector } from './state';

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

/**
 * OPERATION READ SIDE DATA
 */
export const operationsSelector = operationsAdapter.getSelectors(
  (s: RootState) => s.operations
);

// User => fetch accounts => transform accounts to transaction app =>

export const getOperations = (accounts: Array<string>) => {
  const allOperations = useSelector(operationsSelector.selectAll);
  const operations = Object.values(allOperations).filter(({ account }) =>
    accounts.some((i) => account.includes(i))
  );
  return operations;
};

export const getOperationsData = (operationIds: Array<string>) => {
  const allOperations = useTradeSelector(operationsSelector.selectAll);
  return allOperations.filter((o) => operationIds.includes(o.id));
};
