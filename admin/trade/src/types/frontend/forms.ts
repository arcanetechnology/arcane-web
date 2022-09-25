/** @format */

import { Portfolio, Profile, StakeholderFiatAccount, User } from '../backend';

export type CreateUserForm = Omit<User, 'profiles' | 'id'>;
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
export type CreateAccountForm = Omit<StakeholderFiatAccount, 'portfolios'> & {
  confirmId: string;
};
export type CreatePortfolioForm = Omit<Portfolio, 'id' | 'accounts'>;
