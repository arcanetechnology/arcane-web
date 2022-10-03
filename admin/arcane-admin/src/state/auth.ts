/** @format */

import { UserState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './state';

type Auth = {
  user: UserState | null;
  token: string | null;
};

const initialState: Auth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, updateToken } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
