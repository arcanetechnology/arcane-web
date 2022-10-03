/** @format */

import {
  Portfolio,
  Profile,
  StakeholderCryptoAccount,
  StakeholderFiatAccount,
  User,
} from '../backend';

// creation form types
export type CreateUserForm = Omit<User, 'profiles' | 'id'>;
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
export type CreateAccountForm = Omit<
  StakeholderFiatAccount,
  'portfolios' | 'id' | 'balance'
>;
export type CreatePortfolioForm = Omit<Portfolio, 'id' | 'accounts'>;
export type CreateCryptoForm = Omit<StakeholderCryptoAccount, 'id' | 'balance'>;

// miscellaneous

export type SearchUserForm = Omit<User, 'profiles' | 'id'>;
