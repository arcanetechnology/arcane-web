/** @format */

import fuse from 'fuse.js';
import { SearchAbleAccounts } from './Transaction.types';

export const searchConfig: fuse.IFuseOptions<SearchAbleAccounts> = {
  includeMatches: true,
  findAllMatches: true,
  keys: ['cryptoAlias', 'cryptoCurrency', 'accountCurrency', 'accountAlias'],
};
