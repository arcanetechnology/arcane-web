/** @format */

import { User } from './entities';

export type CreateUserRequest = User;
export type GetUsersResponse = Array<Omit<User, 'profiles'>>;
export type GetUserResponse = User;
