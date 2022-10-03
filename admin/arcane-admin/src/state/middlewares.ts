/** @format */
import {
  createListenerMiddleware,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { login, logout } from './auth';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: login,
  effect: async (action, listenerApi) => {
    sessionStorage.setItem('auth', JSON.stringify(action.payload));
  },
});

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: (action) => {
    localStorage.clear();
  },
});

export default listenerMiddleware;

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      toast(action.payload.data, { type: 'error' });
    }
    return next(action);
  };
