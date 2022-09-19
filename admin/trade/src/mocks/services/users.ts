/** @format */

import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { User, CreateUserRequest } from '@/types/backend';

const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

let users = adapter.getInitialState();
const initialData: Array<User> = [];
users = adapter.setAll(users, initialData);

export default users;

export const addUser = (user: CreateUserRequest) => {
  const id = nanoid();
  const result = adapter.addOne(users, {
    id,
    email: user.email,
    profiles: user.profiles ?? [],
  });

  return result.entities[id];
};

export const getUsers = () => {
  return users.entities;
};

export const getUser = (id: string) => users.entities[id];
