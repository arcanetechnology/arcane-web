/** @format */

import { TradeUser, User, VirtualAccount } from './entities';

// get request type
export type UsersResponse = Array<User>;

export type UserResponse = TradeUser;

export type VirtualAccountResponse = Array<VirtualAccount>;
