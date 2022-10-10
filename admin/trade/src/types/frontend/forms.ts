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

// profile form types
export type CreateProfileForm = Omit<Profile, 'accounts' | 'id'>;
export type UpdateProfileForm = Pick<Profile, 'alias'>;

// profile form types
export type CreateAccountForm = Omit<
  StakeholderFiatAccount,
  'portfolios' | 'id' | 'balance'
>;
export type UpdateAccountForm = Pick<StakeholderFiatAccount, 'alias'>;

// portfolio form types
export type CreatePortfolioForm = Omit<Portfolio, 'id' | 'accounts'>;

// crypto portfolio types
// this one is reused for crypto-accounts and portfolio/cryptos
export type CreateCryptoForm = Omit<StakeholderCryptoAccount, 'id' | 'balance'>;
export type UpdateCryptoForm = Pick<StakeholderCryptoAccount,"alias">;

// miscellaneous

export type SearchUserForm = Omit<User, 'profiles' | 'id' | 'createdOn'> & {
  email: string;
};
