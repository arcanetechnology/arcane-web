/** @format */

import { RootState } from '../state';
import { usersAdapter } from './users';

export const usersSelector = usersAdapter.getSelectors(
  (s: RootState) => s.users
);
