/** @format */

import operations from './operations';
import currencyGroups from './currencyGroups';
import accounts from './accounts';
import { api } from '../services';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    operations,
    currencyGroups,
    accounts,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTradeSelector: TypedUseSelectorHook<RootState> = useSelector;
export type TradeDispatch = typeof store.dispatch;

export const useTradeDispatch: () => TradeDispatch = useDispatch;

export default store;
