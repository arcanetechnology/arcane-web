/** @format */

import {
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

type UserState = {
  user: User | null;
};

type Login = CaseReducer<UserState, PayloadAction<User>>;
type Logout = CaseReducer<UserState>;

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>, 'user'>({
  name: 'user',
  initialState: {
    user: null,
  } as UserState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
