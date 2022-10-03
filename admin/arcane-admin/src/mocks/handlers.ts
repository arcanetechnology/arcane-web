/** @format */

import { rest } from 'msw';
import { users } from '@/constants';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { User, CreateUserRequest, UserPath } from '@/types';
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

export { state };

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
];
