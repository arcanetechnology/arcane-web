/** @format */

import { Optional } from '../util';
import { User, Profile } from './entities';

// user api types
export type CreateUserRequest = Omit<
  Optional<User, 'profiles' | 'email'>,
  'id'
>;
export type GetUsersResponse = Array<Omit<User, 'profiles'>>;
export type GetUserResponse = User;

// profile api types
export type GetProfilesResponse = Array<Omit<Profile, 'accounts'>>;
export type GetProfileResponse = Profile;
