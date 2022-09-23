/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './state';

type Auth = {
  email: string | null;
  uid: string;
  photoUrl: string | null;
  displayName: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: null as Auth | null,
  },
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
