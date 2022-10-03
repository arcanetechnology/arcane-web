/** @format */
import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const errorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    console.log(action);
    if (isRejected(action)) {
      toast('User not found', { type: 'error' });
    }
    return next(action);
  };
