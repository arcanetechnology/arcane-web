/** @format */

import {
  Portfolio,
  Profile,
  StakeholderCryptoAccount,
  StakeholderFiatAccount,
  User,
} from '../backend';

// creation form types
// they are generic maybe used in form or used indirectly but they correspond to api call body but only consists of frontend

// user form types
export type CreateUserForm = Omit<User, 'createdOn'>;

// profile form t ypes
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
export type UpdateProfileForm = Pick<Profile, 'alias'>;

export type CreateAccountForm = Omit<
  StakeholderFiatAccount,
  'portfolios' | 'id' | 'balance'
>;
export type CreatePortfolioForm = Omit<Portfolio, 'id' | 'accounts'>;
export type CreateCryptoForm = Omit<StakeholderCryptoAccount, 'id' | 'balance'>;

// miscellaneous

export type SearchUserForm = Omit<User, 'profiles' | 'id' | 'createdOn'> & {
  email: string;
};
