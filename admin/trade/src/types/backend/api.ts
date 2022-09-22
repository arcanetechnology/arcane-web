/** @format */

import { Portfolio } from '../entities';
import { Optional } from '../util';
import {
  User,
  Profile,
  StakeholderFiatAccount,
  StakeholderCryptoAccount,
} from './entities';

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

// portfolio api types

export type GetPortfoliosResponse = Array<Omit<Portfolio, 'accounts'>>;
export type GetPortfolioResponse = Portfolio;

// crypto api types

export type GetCryptosResponse = Array<StakeholderCryptoAccount>;
export type GetCryptoResponse = StakeholderCryptoAccount;
