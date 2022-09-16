/** @format */

import { rest } from 'msw';
import { users } from './services';
import virtualAccounts from '../assets/virtual-account-option-list.json';
import arcaneCustodyAccounts from '../assets/arcane-custody-accounts.json';
import arcaneStakeholderAccounts from '../assets/arcane-stakeholder-accounts.json';

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(users.entities)));
  }),

  rest.post('/users', (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200));
  }),

  rest.get('/users/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const user = users.entities[id];
    return res(ctx.status(200), ctx.json(user));
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
