/** @format */

import { rest } from 'msw';
import { users } from './services';
import virtualAccounts from '../assets/virtual-account-option-list.json';
import arcaneCustodyAccounts from '../assets/arcane-custody-accounts.json';
import arcaneStakeholderAccounts from '../assets/arcane-stakeholder-accounts.json';

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    const newUsers = Object.keys(users.entities).map((u) => ({
      id: users.entities[u]?.id,
      email: users.entities[u]?.email,
    }));
    return res(ctx.status(200), ctx.json(Object.values(newUsers)));
  }),

  rest.get('/users/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const user = users.entities[id];
    console.log(user);
    return res(ctx.status(200), ctx.json(user));
  }),
  rest.get('/virtual/accounts/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(virtualAccounts));
  }),
  rest.get('/arcane/accounts/custody', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(arcaneCustodyAccounts));
  }),
  rest.get('/arcane/accounts/stakeholder', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(arcaneStakeholderAccounts));
  }),
];
