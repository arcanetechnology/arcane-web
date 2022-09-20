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

const login: Login = (state, action) => {
  state.user = action.payload;
};

const logout: Logout = (state) => {
  state.user = null;
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>, 'user'>({
  name: 'user',
  initialState: {
    user: null,
  } as UserState,
  reducers: {
    login,
    logout,
  },
});
