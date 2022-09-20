/** @format */

import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './state';

type UserData = {
  email: string;
  uid: string;
  displayName: string;
  photoUrl: string;
};

type UserState = {
  user: UserData | null;
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>, 'user'>({
  name: 'user',
  initialState: {
    user: null,
  } as UserState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (s: RootState) => s.user.user;
