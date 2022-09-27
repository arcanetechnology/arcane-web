/** @format */

import operations from './operations';
import currencyGroups from './currencyGroups';
import transactions from './transactions';
import { api } from '../services';
import auth from './auth';
import listenerMiddleware, { rtkQueryErrorLogger } from './middlewares';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    auth,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(listenerMiddleware.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTradeSelector: TypedUseSelectorHook<RootState> = useSelector;
export type TradeDispatch = typeof store.dispatch;

export const useTradeDispatch: () => TradeDispatch = useDispatch;

export default store;
