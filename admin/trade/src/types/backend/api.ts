/** @format */

import { Optional } from '../util';
import { User, Profile, StakeholderFiatAccount } from './entities';

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

// accounts api types

export type GetAccountsResponse = Array<
  Omit<StakeholderFiatAccount, 'portfolios'>
>;
export type GetAccountResponse = StakeholderFiatAccount;
