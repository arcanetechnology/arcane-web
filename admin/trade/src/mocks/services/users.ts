/** @format */

import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { User } from '../../types/backend';

const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

let users = adapter.getInitialState();
const initialData: Array<User> = [];
users = adapter.setAll(users, initialData);

export default users;
