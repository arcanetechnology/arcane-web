/** @format */

import operations from './operations';
import currencyGroups from './currencyGroups';
import accounts from './accounts';
import users from './users';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { operations, currencyGroups, accounts, users },
});

export type RootState = ReturnType<typeof store.getState>;
export type TradeDispatch = typeof store.dispatch;

export const useTradeDispatch: () => TradeDispatch = useDispatch;

export default store;
