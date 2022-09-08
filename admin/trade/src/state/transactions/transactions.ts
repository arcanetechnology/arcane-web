/** @format */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Transaction } from '../../types';

export const fetchTransactions = createAsyncThunk<Array<Transaction>, string>(
  'user/account',
  async (id: string, thunkAPI) => {
    const res = await new Promise<Array<Transaction>>((res, _) => {
      setTimeout(() => {
        res([
          {
            id: '1',
            groups: [],
          },
        ]);
      }, 1000);
    });

    return res;
  }
);
