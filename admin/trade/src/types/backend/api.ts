/** @format */

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
  CustodyAccount,
  Portfolio,
} from './entities';

// admin api type

export type SearchUserResponse = string;

// user api types
export type CreateUserRequest = Omit<User, 'createdOn'>;
export type GetUsersResponse = Array<UserItem>;
export type GetUserResponse = User;

// profile api types
export type GetProfilesResponse = Array<ProfileItem>;
export type GetProfileResponse = Profile;
export type CreateProfileRequest = Omit<Profile, 'id'>;

// accounts api types

export type GetAccountsResponse = Array<StakeholderFiatAccountItem>;
export type GetAccountResponse = StakeholderFiatAccount;
export type CreateAccountRequest = Omit<
  StakeholderFiatAccount,
  'id' | 'balance' | 'reservedBalance'
>;

// portfolio api types

export type GetPortfoliosResponse = Array<PortfolioItem>;
export type GetPortfolioResponse = Portfolio;
export type CreatePortfolioRequest = Omit<
  Optional<Portfolio, 'accounts'>,
  'id'
>;

// crypto api types

export type GetCryptosResponse = Array<StakeholderCryptoAccount>;
export type GetCryptoResponse = StakeholderCryptoAccount;
export type CreateCryptoRequest = Omit<
  StakeholderCryptoAccount,
  'id' | 'balance'
>;

// --------------- global apis ----------------- //

export type GetCustodiesResponse = Array<CustodyAccount>;
export type GetCustodyResponse = CustodyAccount;
