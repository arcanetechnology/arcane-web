/** @format */

import { Optional } from '../util';
import { User } from './entities';

export type CreateUserRequest = Omit<
  Optional<User, 'profiles' | 'email'>,
  'id'
>;
export type GetUsersResponse = Array<Omit<User, 'profiles'>>;
export type GetUserResponse = User;
