/** @format */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  Account,
  AccountOption,
  Portfolio,
  Profile,
  TradeUser,
} from '../../types';

function getAllUserAccountOptions(user: TradeUser): AccountOption[] {
  const addProfilePrefix: boolean = user.profiles.length > 1;
  return user.profiles.flatMap((profile) => {
    const profilePrefix = addProfilePrefix
      ? `${profile.alias} ${profile.type} ≫ `
      : '';
    return getAllProfileAccountOptions(profile).map((accountOption) => ({
      ...accountOption,
      label: `${profilePrefix}${accountOption.label}`,
    }));
  });
}

function getAllProfileAccountOptions(
  profile: Profile,
): AccountOption[] {
  return profile
    .accounts
    .flatMap((account) => {
      const accountPrefix = `${account.alias} ${account.currency}`
      const accountOptions: AccountOption[] = [];
      accountOptions.push({
        id: account.id,
        label: accountPrefix,
        type: 'Fiat',
        balance: account.balance,
        currency: account.currency,
      })
      accountOptions.push(
        ...(getAllStakeholderAccountOptions(account)
            .map((accountOption) => ({
                ...accountOption,
                label: `${accountPrefix} ≫ ${accountOption.label}`,
              })
            )
        )
      )
      return accountOptions
    })
}

function getAllStakeholderAccountOptions(
  account: Account,
): AccountOption[] {
  const addPortfolioPrefix = account.portfolios.length > 1
  return account
    .portfolios
    .flatMap((portfolio) => {
      const portfolioPrefix = addPortfolioPrefix ? `${portfolio.alias} ≫ ` : ""
      return getAllPortfolioAccountOptions(
        portfolio,
      ).map((accountOption) => ({
          ...accountOption,
          label: `${portfolioPrefix}${accountOption.label}`,
        })
      )
    })
}

function getAllPortfolioAccountOptions(
  portfolio: Portfolio,
): AccountOption[] {
  return portfolio
    .cryptoAccounts
    .map((cryptoAccount) =>
      ({
        id: cryptoAccount.id,
        label: `${cryptoAccount.alias} ${cryptoAccount.currency}`,
        type: 'Crypto',
        balance: cryptoAccount.balance,
        currency: cryptoAccount.currency
      })
    )
}

function getVirtualAccounts(): AccountOption[] {
  return [{
    id: "virtual-account-user-external-nok",
    type: "Virtual",
    label: "User External NOK",
    currency: "NOK",
    balance: 0,
  }]
}

const tradeUser: TradeUser = {
  "id": "user-1",
  "email": "user-1@arcane.no",
  "profiles": [
    {
      "id": "profile-1-1",
      "alias": "Profile 1-1",
      "type": "PERSONAL",
      "accounts": [
        {
          "id": "account 1-1-1",
          "balance": 0,
          "currency": "NOK",
          "alias": "Account 1-1-1",
          "portfolios": [
            {
              "id": "portfolio 1-1-1-1",
              "alias": "Portfolio 1-1-1-1",
              "cryptoAccounts": [
                {
                  "id": "crypto 1-1-1-1-1",
                  "balance": 0,
                  "currency": "BTC",
                  "alias": "Crypto 1-1-1-1-1"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "profile-1-2",
      "alias": "Profile 1-2",
      "type": "BUSINESS",
      "accounts": [
        {
          "id": "account 1-2-1",
          "balance": 0,
          "currency": "EUR",
          "alias": "Account 1-2-1",
          "portfolios": [
            {
              "id": "portfolio 1-2-1-1",
              "alias": "Portfolio 1-2-1-1",
              "cryptoAccounts": [
                {
                  "id": "crypto 1-2-1-1-1",
                  "balance": 0,
                  "currency": "BTC",
                  "alias": "Crypto 1-2-1-1-1"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export const fetchUserAccounts = createAsyncThunk<
  Array<AccountOption>,
  string
>('user/account', async (id: string, thunkAPI) => {
  const res = await new Promise<Array<AccountOption>>((res, _) => {
    setTimeout(() => {
      res(getAllUserAccountOptions(tradeUser).concat(getVirtualAccounts()));
    }, 1000);
  });

  return res;
});

export const accountsAdapter = createEntityAdapter<AccountOption>({
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
