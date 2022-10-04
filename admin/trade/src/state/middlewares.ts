/** @format */
import {
  isRejected,
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const errorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    console.log(action);
    if (isRejectedWithValue(action)) {
      toast(action.error.message, { type: 'error' });
    }
    return next(action);
  };
