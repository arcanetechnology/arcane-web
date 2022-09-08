/** @format */

import { rest } from 'msw';
import { users } from './services';

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
    console.log(id);
    const user = users.entities[id];
    console.log(user);
    return res(ctx.status(200), ctx.json(user));
  }),
];
