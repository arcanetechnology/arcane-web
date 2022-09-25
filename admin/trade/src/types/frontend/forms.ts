/** @format */

import { User } from '../backend';

export type CreateUserForm = Omit<User, 'profiles' | 'id'>;
