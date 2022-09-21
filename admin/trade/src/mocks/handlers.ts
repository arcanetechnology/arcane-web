/** @format */

import { rest } from 'msw';
import virtualAccounts from '../assets/virtual-account-option-list.json';
import arcaneCustodyAccounts from '../assets/arcane-custody-accounts.json';
import arcaneStakeholderAccounts from '../assets/arcane-stakeholder-accounts.json';
import { PROFILES_ENDPOINT, USERS_ENDPOINT } from '@/constants';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { User, CreateUserRequest, Profile } from '@/types/backend';

/// user state
const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

let state = adapter.getInitialState();
const initialData: Array<User> = [
  { id: '1', email: 'test@test.com', profiles: ['1', '2'] },
  { id: '2', email: 'test2@test.com', profiles: ['1', '2'] },
];
state = adapter.setAll(state, initialData);

// profile state
const profileAdapter = createEntityAdapter<Profile>({
  selectId: (profile) => profile.id,
});
let profileState = profileAdapter.getInitialState();
const initialProfileState: Array<Profile> = [
  { id: '1', accounts: [], type: 'BUSINESS' },
  { id: '2', accounts: [], type: 'PERSONAL' },
];

profileState = profileAdapter.setAll(profileState, initialProfileState);

export { state, profileState };

export const handlers = [
  rest.get(`/${USERS_ENDPOINT}`, (req, res, ctx) => {
    const email = req.url.searchParams.get('q');

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
      email: email ?? '',
      id: nanoid(),
      profiles: profiles ?? [],
    });
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),

  rest.get(`/${USERS_ENDPOINT}/:id`, (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(ctx.status(200), ctx.json(state.entities[id]), ctx.delay(400));
  }),

  rest.delete(`/${USERS_ENDPOINT}/:id`, (req, res, ctx) => {
    const { id } = req.params as { id: string };
    state = adapter.removeOne(state, id);
    return res(ctx.status(200), ctx.delay(400));
  }),
  rest.get(`/${USERS_ENDPOINT}/:id/${PROFILES_ENDPOINT}`, (req, res, ctx) => {
    const { id } = req.params as { id: string };
    console.log('inside profile endpoint');
    console.log(id);
    return res(
      ctx.status(200),
      ctx.json(Object.values(profileState.entities)),
      ctx.delay(400)
    );
  }),
];
