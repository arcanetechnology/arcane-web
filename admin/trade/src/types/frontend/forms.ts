/** @format */

import { Profile, User } from '../backend';

export type CreateUserForm = Omit<User, 'profiles' | 'id'>;
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
