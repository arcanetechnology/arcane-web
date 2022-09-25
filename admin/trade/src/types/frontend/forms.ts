/** @format */

import { Profile, StakeholderFiatAccount, User } from '../backend';

export type CreateUserForm = Omit<User, 'profiles' | 'id'>;
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
export type CreateAccountForm = Omit<
  StakeholderFiatAccount,
  'portfolios' | 'id'
>;
