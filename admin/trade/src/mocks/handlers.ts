/** @format */

import { rest } from 'msw';
import { addUser, getUsers, getUser } from './services';
import virtualAccounts from '../assets/virtual-account-option-list.json';
import arcaneCustodyAccounts from '../assets/arcane-custody-accounts.json';
import arcaneStakeholderAccounts from '../assets/arcane-stakeholder-accounts.json';
import { USERS_ENDPOINT, USER_ENDPOINT } from '@/constants';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { User, CreateUserRequest } from '@/types/backend';

let count = 0;
let startingId = 1;

const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

let state = adapter.getInitialState();
const initialData: Array<User> = [];
state = adapter.setAll(state, initialData);

export { state };

export const handlers = [
  rest.get(`/${USERS_ENDPOINT}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(state.entities)));
  }),

  rest.post(`/${USERS_ENDPOINT}`, async (req, res, ctx) => {
    const { email, profiles } = req.body as CreateUserRequest;
    state = adapter.addOne(state, {
      email,
      id: nanoid(),
      profiles: profiles ?? [],
    });
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),

  rest.get('/users/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(ctx.status(200), ctx.json(getUser(id)));
  }),
  // rest.get('/virtual/accounts', (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(virtualAccounts));
  // }),
  // rest.get('/arcane/accounts/custody', (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(arcaneCustodyAccounts));
  // }),
  // rest.get('/arcane/accounts/stakeholder', (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(arcaneStakeholderAccounts));
  // }),
];
