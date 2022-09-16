/** @format */

import { User } from '../backend';

export type UserForm = Omit<User, 'profiles' | 'id'>;
