/** @format */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../../types';

export const fetchUsers = createAsyncThunk<Array<User>>(
  'users',
  async (thunkAPI) => {
    const res = await new Promise<Array<User>>((res, _) => {
      setTimeout(() => {
        res([
          {
            id: '1',
            email: 'one@arcane.no',
          },
          {
            id: '2',
            email: 'two@arcane.no',
          },
          {
            id: '3',
            email: 'three@arcane.no',
          },
          {
            id: '4',
            email: 'four@arcane.no',
          },
          {
            id: '5',
            email: 'five@arcane.no',
          },
          {
            id: '6',
            email: 'six@arcane.no',
          },
          {
            id: '7',
            email: 'seven@arcane.no',
          },
          {
            id: '8',
            email: 'eight@arcane.no',
          },
          {
            id: '9',
            email: 'nine@arcane.no',
          },
        ]);
      }, 1000);
    });

    return res;
  }
);

export const usersAdapter = createEntityAdapter<User>({
  selectId: (account) => account.id,
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({ loading: 'idle' }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.addMany(state, action.payload);
      state.loading = 'fetched';
    });
  },
});

export default usersSlice;
