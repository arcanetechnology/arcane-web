/** @format */

import { rest } from 'msw';
import { User } from '../components/trade/Trade.types';
import { faker } from '@faker-js/faker';

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    const users: Array<User> = Array.from({ length: 10 }).map(() => {
      return {
        userId: faker.datatype.uuid(),
        createdOn: faker.datatype.datetime().toDateString(),
      };
    });
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.get('/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    return res(
      ctx.json({
        id: userId,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      })
    );
  }),
];
