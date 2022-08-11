/** @format */

import { FiatCustodyAccount, UserProfile, CryptoCustodyAccount } from '.';

export type GetUserInfo = {
  user: UserProfile;
  fiatCustodyAccounts: FiatCustodyAccount;
  cryptoCustodyAccounts: CryptoCustodyAccount;
};
