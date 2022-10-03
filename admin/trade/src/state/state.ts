/** @format */
import { api } from '@/services';
import auth from './auth';
import { errorLogger } from './middlewares';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

// redux persist
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const persistedAuth = persistReducer(persistConfig, auth);

const store = configureStore({
  reducer: {
    auth: persistedAuth,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(errorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTradeSelector: TypedUseSelectorHook<RootState> = useSelector;
export type TradeDispatch = typeof store.dispatch;

export const useTradeDispatch: () => TradeDispatch = useDispatch;

export default store;
