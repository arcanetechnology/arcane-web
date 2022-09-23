/** @format */
import { createListenerMiddleware } from '@reduxjs/toolkit';
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
