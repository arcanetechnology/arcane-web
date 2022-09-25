/** @format */

import { rest } from 'msw';
import virtualAccounts from '../assets/virtual-account-option-list.json';
import arcaneCustodyAccounts from '../assets/arcane-custody-accounts.json';
import arcaneStakeholderAccounts from '../assets/arcane-stakeholder-accounts.json';
import {
  PROFILES_ENDPOINT,
  USERS_ENDPOINT,
  ACCOUNTS_ENDPOINT,
  PORTFOLIOS_ENDPOINT,
  CRYPTOS_ENDPOINT,
} from '@/constants';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import {
  User,
  CreateUserRequest,
  Profile,
  StakeholderFiatAccount,
  Portfolio,
  StakeholderCryptoAccount,
  CreateProfileRequest,
} from '@/types/backend';
import {
  AccountPath,
  CryptoPath,
  PortfolioPath,
  ProfilePath,
  UserPath,
} from '@/types/frontend';

/// user state
const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

let state = adapter.getInitialState();
const initialData: Array<User> = [
  { id: '1', email: 'test@test.com', profiles: [] },
  { id: '2', email: 'test2@test.com', profiles: [] },
];
state = adapter.setAll(state, initialData);

// profile state
const profileAdapter = createEntityAdapter<Profile>({
  selectId: (profile) => profile.id,
});
let profileState = profileAdapter.getInitialState();
const initialProfileState: Array<Profile> = [];

profileState = profileAdapter.setAll(profileState, initialProfileState);

// account state

const accountAdapter = createEntityAdapter<StakeholderFiatAccount>({
  selectId: (account) => account.id,
});

let accountState = accountAdapter.getInitialState();
const initialAccountState: Array<StakeholderFiatAccount> = [];

accountState = accountAdapter.setAll(accountState, initialAccountState);

// portfolio backend state
const portfolioAdapter = createEntityAdapter<Portfolio>({
  selectId: (portfolio) => portfolio.id,
});

let portfolioState = portfolioAdapter.getInitialState();

const initialPortfolioState: Array<Portfolio> = [
  {
    id: '1',
    alias: 'portfolio-1',
    accounts: ['crypto-1', 'crypto-2', 'crypto-3', 'crypto-4'],
  },
  {
    id: '2',
    alias: 'portfolio-2',
    accounts: ['crypto-1', 'crypto-2', 'crypto-3', 'crypto-4'],
  },
];

portfolioState = portfolioAdapter.setAll(portfolioState, initialPortfolioState);

// crypto backend state
const cryptoAdapter = createEntityAdapter<StakeholderCryptoAccount>({
  selectId: (crypto) => crypto.id,
});

let cryptoState = cryptoAdapter.getInitialState();

const initialCryptoState: Array<StakeholderCryptoAccount> = [
  {
    id: 'crypto-1',
    alias: 'crypto-alias-1',
    balance: 12341,
    currency: 'ETH',
    custodyAccountId: 'crypto-custody-1',
  },
  {
    id: 'crypto-2',
    alias: 'crypto-alias-2',
    balance: 12341,
    currency: 'BTC',
    custodyAccountId: 'crypto-custody-2',
  },
];

cryptoState = cryptoAdapter.setAll(cryptoState, initialCryptoState);

export { state, profileState, accountState, portfolioState, cryptoState };

export const handlers = [
  rest.get(`/${USERS_ENDPOINT}`, (req, res, ctx) => {
    const email = req.url.searchParams.get('q') as string;

    if (!email) {
      return res(
        ctx.status(200),
        ctx.json(Object.values(state.entities)),
        ctx.delay(400)
      );
    }

    const selector = adapter.getSelectors();
    const filteredUser = selector
      .selectAll(state)
      .filter((u) => u.email.includes(email));

    if (filteredUser.length === 0) {
      return res(
        ctx.status(200),
        ctx.json(Object.values(state.entities)),
        ctx.delay(400)
      );
    }

    return res(ctx.status(200), ctx.json(filteredUser), ctx.delay(400));
  }),

  rest.post(`/${USERS_ENDPOINT}`, async (req, res, ctx) => {
    const { email, profiles } = req.body as CreateUserRequest;
    state = adapter.addOne(state, {
      email: email,
      id: nanoid(),
      profiles: profiles ?? [],
    });
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),

  rest.get(`/${USERS_ENDPOINT}/:userId`, (req, res, ctx) => {
    const { userId } = req.params as UserPath;
    return res(
      ctx.status(200),
      ctx.json(state.entities[userId]),
      ctx.delay(400)
    );
  }),

  rest.delete(`/${USERS_ENDPOINT}/:userId`, (req, res, ctx) => {
    const { userId } = req.params as UserPath;
    state = adapter.removeOne(state, userId);
    return res(ctx.status(200), ctx.delay(400));
  }),
  // profiles
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}`,
    (req, res, ctx) => {
      const { userId } = req.params as UserPath;

      const user = state.entities[userId];

      const profiles = user?.profiles.map((p) => profileState.entities[p]);

      return res(ctx.status(200), ctx.json(profiles), ctx.delay(400));
    }
  ),
  rest.post(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}`,
    (req, res, ctx) => {
      const { userId } = req.params as UserPath;
      const { alias, type, accounts } = req.body as CreateProfileRequest;
      const profileId = nanoid();
      profileState = profileAdapter.addOne(profileState, {
        alias: alias,
        type: type,
        id: profileId,
        accounts: accounts ?? [],
      });

      const userSelector = adapter.getSelectors();
      const user = userSelector.selectById(state, userId);

      state = adapter.updateOne(state, {
        id: userId,
        changes: {
          profiles: [...(user?.profiles ?? []), profileId],
        },
      });

      return res(
        ctx.json(Object.values(profileState.entities)),
        ctx.delay(400)
      );
    }
  ),
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId`,
    (req, res, ctx) => {
      const { userId, profileId } = req.params as ProfilePath;

      return res(
        ctx.status(200),
        ctx.json(profileState.entities[profileId]),
        ctx.delay(400)
      );
    }
  ),
  // accounts
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId/${ACCOUNTS_ENDPOINT}`,
    (req, res, ctx) => {
      const { userId, profileId } = req.params as ProfilePath;
      const profiles = profileState.entities[profileId];
      const accounts = profiles?.accounts.map((a) => accountState.entities[a]);
      return res(ctx.status(200), ctx.json(accounts), ctx.delay(400));
    }
  ),
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId/${ACCOUNTS_ENDPOINT}/:accountId`,
    (req, res, ctx) => {
      const { userId, profileId, accountId } = req.params as AccountPath;
      console.log('user id', userId);
      console.log('profile id', profileId);
      console.log('account id', accountId);
      return res(
        ctx.status(200),
        ctx.json(accountState.entities['1']),
        ctx.delay(400)
      );
    }
  ),
  // portfolios
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId/${ACCOUNTS_ENDPOINT}/:accountId/${PORTFOLIOS_ENDPOINT}`,
    (req, res, ctx) => {
      const { userId, profileId, accountId } = req.params as AccountPath;
      return res(
        ctx.status(200),
        ctx.json(Object.values(portfolioState.entities)),
        ctx.delay(400)
      );
    }
  ),
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId/${ACCOUNTS_ENDPOINT}/:accountId/${PORTFOLIOS_ENDPOINT}/:portfolioId`,
    (req, res, ctx) => {
      const { userId, profileId, accountId, portfolioId } =
        req.params as PortfolioPath;
      console.log('user id', userId);
      console.log('profile id', profileId);
      console.log('account id', accountId);
      console.log('portfolio id', portfolioId);
      return res(
        ctx.status(200),
        ctx.json(portfolioState.entities['1']),
        ctx.delay(400)
      );
    }
  ),
  // cryptos
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId/${ACCOUNTS_ENDPOINT}/:accountId/${PORTFOLIOS_ENDPOINT}/:portfolioId/${CRYPTOS_ENDPOINT}`,
    (req, res, ctx) => {
      const { userId, profileId, accountId, portfolioId } =
        req.params as PortfolioPath;
      return res(
        ctx.status(200),
        ctx.json(Object.values(cryptoState.entities)),
        ctx.delay(400)
      );
    }
  ),
  rest.get(
    `/${USERS_ENDPOINT}/:userId/${PROFILES_ENDPOINT}/:profileId/${ACCOUNTS_ENDPOINT}/:accountId/${PORTFOLIOS_ENDPOINT}/:portfolioId/${CRYPTOS_ENDPOINT}/:cryptoId`,
    (req, res, ctx) => {
      const { userId, profileId, accountId, portfolioId, cryptoId } =
        req.params as CryptoPath;
      console.log('user id', userId);
      console.log('profile id', profileId);
      console.log('account id', accountId);
      console.log('portfolio id', portfolioId);
      console.log('crypto id', cryptoId);
      return res(
        ctx.status(200),
        ctx.json(cryptoState.entities['crypto-1']),
        ctx.delay(400)
      );
    }
  ),
];
