/** @format */

import { Portfolio } from '../entities';
import { Optional } from '../util';
import {
  User,
  Profile,
  StakeholderFiatAccount,
  StakeholderCryptoAccount,
  UserItem,
  ProfileItem,
  StakeholderFiatAccountItem,
  PortfolioItem,
} from './entities';

// user api types
export type CreateUserRequest = Omit<Optional<User, 'profiles'>, 'id'>;
export type GetUsersResponse = Array<UserItem>;
export type GetUserResponse = User;

// profile api types
export type GetProfilesResponse = Array<ProfileItem>;
export type GetProfileResponse = Profile;
export type CreateProfileRequest = Omit<Optional<Profile, 'accounts'>, 'id'>;

// accounts api types

export type GetAccountsResponse = Array<StakeholderFiatAccountItem>;
export type GetAccountResponse = StakeholderFiatAccount;

// portfolio api types

export type GetPortfoliosResponse = Array<PortfolioItem>;
export type GetPortfolioResponse = Portfolio;

// crypto api types

export type GetCryptosResponse = Array<StakeholderCryptoAccount>;
export type GetCryptoResponse = StakeholderCryptoAccount;
