/** @format */

import { Template } from '@/types';

// api
export const users = 'users';
export const user = 'user';
export const profiles = 'profiles';
export const accounts = 'accounts';
export const cryptoAccounts = 'crypto-accounts';
export const portfolios = 'portfolios';
export const cryptos = 'cryptos';
export const custodies = 'custody-accounts';
export const transactions = 'transactions';

// UI
export const GAP = 2;
export const MAX_CARD_WIDTH = 345;

// TEMPLATES

export const templates: Array<Template> = [
  {
    id: '1',
    name: 'Funding In',
    inputs: [
      {
        name: 'amount',
        label: 'Amount',
        type: 'number',
      },
      {
        name: 'currency',
        label: 'Currency',
        type: 'string',
      },
    ],
  },
];
