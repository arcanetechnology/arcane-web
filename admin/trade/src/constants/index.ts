/** @format */

import { CryptoPath } from '@/types/frontend';

// api
export const USERS_ENDPOINT = 'users';
export const PROFILES_ENDPOINT = 'profiles';
export const ACCOUNTS_ENDPOINT = 'accounts';
export const PORTFOLIOS_ENDPOINT = 'portfolios';
export const CRYPTOS_ENDPOINT = 'cryptos';
export const CUSTODY_ENDPOINT = 'custodies';

// api util function to create paths
const endpoints = {
  user: 'users',
  profile: 'profiles',
  account: 'accounts',
  portfolio: 'portfolios',
  crypto: 'cryptos',
};

export const getPath = (
  path: Partial<CryptoPath> = {},
  key: keyof typeof endpoints | null = null
) => {
  const pathList = Object.values(endpoints);
  const idList = Object.values(path);
  const endpoint = idList.map((id, i) => {
    return pathList[i] + '/' + id;
  });

  if (key) {
    return endpoint.join('/') + '/' + endpoints[key];
  }
  return endpoints['user'];
};

// UI
export const GAP = 2;
export const MAX_CARD_WIDTH = 345;
