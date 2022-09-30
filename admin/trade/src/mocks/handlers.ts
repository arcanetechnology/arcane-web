/** @format */

import { rest } from 'msw';
// import virtualAccounts from '../assets/virtual-account-option-list.json';
// import arcaneCustodyAccounts from '../assets/arcane-custody-accounts.json';
// import arcaneStakeholderAccounts from '../assets/arcane-stakeholder-accounts.json';
import {
  profiles,
  users,
  accounts,
  portfolios,
  cryptos,
  custodies,
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
  CustodyAccount,
  CreateAccountRequest,
  CreatePortfolioRequest,
  CreateCryptoRequest,
  AccountPath,
  CryptoPath,
  CustodyPath,
  PortfolioPath,
  ProfilePath,
  UserPath,
} from '@/types';
import { getEntireUrl } from '@/utils';

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

const initialPortfolioState: Array<Portfolio> = [];

portfolioState = portfolioAdapter.setAll(portfolioState, initialPortfolioState);

// crypto backend state
const cryptoAdapter = createEntityAdapter<StakeholderCryptoAccount>({
  selectId: (crypto) => crypto.id,
});

let cryptoState = cryptoAdapter.getInitialState();

const initialCryptoState: Array<StakeholderCryptoAccount> = [];

cryptoState = cryptoAdapter.setAll(cryptoState, initialCryptoState);

// custody accounts

const custodyAdapter = createEntityAdapter<CustodyAccount>({
  selectId: (crypto) => crypto.id,
});

let custodyState = custodyAdapter.getInitialState();

const initialCustodyState: Array<CustodyAccount> = [
  {
    id: 'real-nok-sp1',
    alias: 'Real NOK SP1',
    balance: 1000000000,
    currency: 'NOK',
  },
  {
    id: 'real-usd-sp1',
    alias: 'Real USD SP1',
    balance: 1000000000,
    currency: 'USD',
  },
  {
    id: 'real-eth-coinbase',
    alias: 'Real ETH Coinbase',
    balance: 1000000000,
    currency: 'ETH',
  },
  {
    id: 'real-eth-metamask',
    alias: 'Real ETH Metamask',
    balance: 1000000000,
    currency: 'ETH',
  },
  {
    id: 'real-matic-ftx',
    alias: 'Real MATIC FTX',
    balance: 1000000000,
    currency: 'MATIC',
  },
  {
    id: 'real-matic-metamask',
    alias: 'Real MATIC Metamask',
    balance: 1000000000,
    currency: 'MATIC',
  },
];

custodyState = custodyAdapter.setAll(custodyState, initialCustodyState);

export {
  state,
  profileState,
  accountState,
  portfolioState,
  cryptoState,
  custodyState,
};

const getBackendUrl = getEntireUrl(import.meta.env.VITE_BASE_URL);

export const handlers = [
  rest.get(getBackendUrl(users), (req, res, ctx) => {
    const email = req.url.searchParams.get('q') as string;
    if (!email) {
      return res(
        ctx.status(404),
        ctx.json('email is not present'),
        ctx.delay(400)
      );
    }

    const selector = adapter.getSelectors();
    const filteredUser = selector
      .selectAll(state)
      .find((u) => u.email === email);

    if (!filteredUser) {
      return res(ctx.status(404), ctx.json('user not found'), ctx.delay(400));
    }

    return res(ctx.status(200), ctx.json([filteredUser]), ctx.delay(400));
  }),

  rest.post(getBackendUrl(users), async (req, res, ctx) => {
    const { email, profiles } = req.body as CreateUserRequest;
    state = adapter.addOne(state, {
      email: email,
      id: nanoid(),
      profiles: profiles ?? [],
    });
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),

  rest.get(getBackendUrl(users, ':userId'), (req, res, ctx) => {
    const { userId } = req.params as UserPath;
    return res(
      ctx.status(200),
      ctx.json(state.entities[userId]),
      ctx.delay(400)
    );
  }),

  rest.delete(getBackendUrl(users, ':userId'), (req, res, ctx) => {
    const { userId } = req.params as UserPath;
    state = adapter.removeOne(state, userId);
    return res(ctx.status(200), ctx.delay(400));
  }),
  // profiles
  rest.get(getBackendUrl(users, ':userId', profiles), (req, res, ctx) => {
    const { userId } = req.params as UserPath;

    const user = state.entities[userId];

    const profiles = user?.profiles.map((p) => profileState.entities[p]);

    return res(ctx.status(200), ctx.json(profiles), ctx.delay(400));
  }),
  rest.post(getBackendUrl(users, ':userId', profiles), (req, res, ctx) => {
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

    return res(ctx.json(Object.values(profileState.entities)), ctx.delay(400));
  }),
  rest.get(
    getBackendUrl(users, ':userId', profiles, ':profileId'),
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
    getBackendUrl(users, ':userId', profiles, ':profileId', accounts),
    (req, res, ctx) => {
      const { userId, profileId } = req.params as ProfilePath;
      const profiles = profileState.entities[profileId];
      const accounts = profiles?.accounts.map((a) => accountState.entities[a]);
      return res(ctx.status(200), ctx.json(accounts), ctx.delay(400));
    }
  ),

  rest.post(
    getBackendUrl(users, ':userId', profiles, ':profileId', accounts),
    (req, res, ctx) => {
      const { userId, profileId } = req.params as ProfilePath;
      const { alias, portfolios, currency, custodyAccountId } =
        req.body as CreateAccountRequest;
      const id = nanoid();
      accountState = accountAdapter.addOne(accountState, {
        alias,
        id,
        balance: 0,
        currency,
        custodyAccountId,
        portfolios: portfolios ?? [],
      });

      const profile = profileState.entities[profileId];

      profileState = profileAdapter.updateOne(profileState, {
        id: profileId,
        changes: {
          accounts: [...(profile?.accounts ?? []), id],
        },
      });

      return res(
        ctx.json(Object.values(accountState.entities)),
        ctx.delay(400)
      );
    }
  ),
  rest.get(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId'
    ),
    (req, res, ctx) => {
      const { accountId } = req.params as AccountPath;
      return res(
        ctx.status(200),
        ctx.json(accountState.entities[accountId]),
        ctx.delay(400)
      );
    }
  ),

  // portfolios
  rest.get(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId',
      portfolios
    ),
    (req, res, ctx) => {
      const { accountId } = req.params as AccountPath;
      const account = accountState.entities[accountId];
      const portfolios = account?.portfolios.map(
        (p) => portfolioState.entities[p]
      );
      return res(ctx.status(200), ctx.json(portfolios), ctx.delay(400));
    }
  ),

  rest.post(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId',
      portfolios
    ),
    (req, res, ctx) => {
      const { accountId } = req.params as AccountPath;
      const { alias, accounts } = req.body as CreatePortfolioRequest;

      const portfolioId = nanoid();

      portfolioState = portfolioAdapter.addOne(portfolioState, {
        id: portfolioId,
        alias,
        accounts: accounts ?? [],
      });

      const account = accountState.entities[accountId];

      accountState = accountAdapter.updateOne(accountState, {
        id: accountId,
        changes: {
          portfolios: [...(account?.portfolios ?? []), portfolioId],
        },
      });

      return res(
        ctx.json(Object.values(portfolioState.entities)),
        ctx.delay(400)
      );
    }
  ),

  rest.get(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId',
      portfolios,
      ':portfolioId'
    ),
    (req, res, ctx) => {
      const { userId, profileId, accountId, portfolioId } =
        req.params as PortfolioPath;
      return res(
        ctx.status(200),
        ctx.json(portfolioState.entities[portfolioId]),
        ctx.delay(400)
      );
    }
  ),
  // cryptos
  rest.get(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId',
      portfolios,
      ':portfolioId',
      cryptos
    ),
    (req, res, ctx) => {
      const { userId, profileId, accountId, portfolioId } =
        req.params as PortfolioPath;

      const portfolio = portfolioState.entities[portfolioId];
      const cryptos = portfolio?.accounts.map((c) => cryptoState.entities[c]);
      return res(ctx.status(200), ctx.json(cryptos), ctx.delay(400));
    }
  ),
  rest.post(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId',
      portfolios,
      ':portfolioId',
      cryptos
    ),
    (req, res, ctx) => {
      const { portfolioId } = req.params as PortfolioPath;

      const { alias, currency, custodyAccountId } =
        req.body as CreateCryptoRequest;

      const id = nanoid();
      cryptoState = cryptoAdapter.addOne(cryptoState, {
        alias,
        id,
        balance: 0,
        currency,
        custodyAccountId,
      });

      const portfolio = portfolioState.entities[portfolioId];

      portfolioState = portfolioAdapter.updateOne(portfolioState, {
        id: portfolioId,
        changes: {
          accounts: [...(portfolio?.accounts ?? []), id],
        },
      });

      return res(
        ctx.status(200),
        ctx.json(Object.values(cryptoState.entities)),
        ctx.delay(400)
      );
    }
  ),
  rest.get(
    getBackendUrl(
      users,
      ':userId',
      profiles,
      ':profileId',
      accounts,
      ':accountId',
      portfolios,
      ':portfolioId',
      cryptos,
      ':cryptoId'
    ),
    (req, res, ctx) => {
      const { userId, profileId, accountId, portfolioId, cryptoId } =
        req.params as CryptoPath;
      return res(
        ctx.status(200),
        ctx.json(cryptoState.entities[cryptoId]),
        ctx.delay(400)
      );
    }
  ),

  // custody stuff
  rest.get(getBackendUrl(custodies), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(Object.values(custodyState.entities)),
      ctx.delay(400)
    );
  }),
  rest.get(getBackendUrl(custodies, ':custodyId'), (req, res, ctx) => {
    const { custodyId } = req.params as CustodyPath;
    return res(
      ctx.status(200),
      ctx.json(custodyState.entities[custodyId]),
      ctx.delay(400)
    );
  }),
];
