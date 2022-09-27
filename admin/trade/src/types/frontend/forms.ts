/** @format */

import {
  Portfolio,
  Profile,
  StakeholderCryptoAccount,
  StakeholderFiatAccount,
  User,
} from '../backend';

export type AccountFormExtension = {
  confirmId: string;
};

// creation form types
export type CreateUserForm = Omit<User, 'profiles' | 'id'>;
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
export type CreateAccountForm = Omit<StakeholderFiatAccount, 'portfolios'> &
  AccountFormExtension;
export type CreatePortfolioForm = Omit<Portfolio, 'id' | 'accounts'>;
export type CreateCryptoForm = StakeholderCryptoAccount & AccountFormExtension;

// miscellaneous

export type SearchUserForm = Omit<User, 'profiles' | 'id'>;
