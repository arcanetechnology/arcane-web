/** @format */

import {
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

type Auth = {
  email: string;
  name: string;
  photoUrl: string;
};

type LoginPayload = {
  email: string;
  name: string;
  photoUrl: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: null as Auth | null,
  },
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
