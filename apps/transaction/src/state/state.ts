/** @format */

import operations from './operations';
import sections from './sections';
import accounts from './accounts';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { operations, sections, accounts },
});

export type RootState = ReturnType<typeof store.getState>;
export type TransactionDispatch = typeof store.dispatch;

export const useTransactionDispatch: () => TransactionDispatch = useDispatch;

export default store;
