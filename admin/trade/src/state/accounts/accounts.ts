/** @format */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { AccountOptions } from '../../types';

export const fetchUserAccounts = createAsyncThunk<
  Array<AccountOptions>,
  string
>('user/account', async (id: string, thunkAPI) => {
  const res = await new Promise<Array<AccountOptions>>((res, _) => {
    setTimeout(() => {
      res([
        {
          id: '1',
          label: 'label1',
          type: 'Crypto',
          balance: 1233,
          currency: 'BTC',
        },
        {
          id: '2',
          label: 'label2',
          type: 'Fiat',
          balance: 1289163,
          currency: 'USD',
        },
        {
          id: '3',
          label: 'label3',
          type: 'Crypto',
          balance: 1762,
          currency: 'ETH',
        },
        {
          id: '4',
          label: 'label4',
          type: 'Fiat',
          balance: 12618721,
          currency: 'NOK',
        },
        {
          id: '5',
          label: 'label5',
          type: 'Crypto',
          balance: 23131331,
          currency: 'Doge',
        },
        {
          id: '6',
          label: 'label6',
          type: 'Crypto',
          balance: 261532,
          currency: 'USD',
        },
        {
          id: '7',
          label: 'label7',
          type: 'Crypto',
          balance: 123,
          currency: 'SOL',
        },
        {
          id: '8',
          label: 'label8',
          type: 'Fiat',
          balance: 816112,
          currency: 'GBP',
        },
        {
          id: '9',
          label: 'label9',
          type: 'Fiat',
          balance: 23846,
          currency: 'SEK',
        },
      ]);
    }, 1000);
  });

  return res;
});

export const accountsAdapter = createEntityAdapter<AccountOptions>({
  selectId: (account) => account.id,
});

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsAdapter.getInitialState({ loading: 'idle' }),
  reducers: {
    accountAdded: accountsAdapter.addOne,
    accountDeleted: accountsAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addCase(fetchUserAccounts.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchUserAccounts.fulfilled, (state, action) => {
      accountsAdapter.addMany(state, action.payload);
      state.loading = 'fetched';
    });
  },
});

export default accountsSlice;

export const { accountAdded, accountDeleted } = accountsSlice.actions;
