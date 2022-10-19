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
export const operations = 'operations';

// UI
export const GAP = 2;
export const MAX_CARD_WIDTH = 345;

// TEMPLATES

// ! you cannot have a template running at profile or user level

export const templates: Array<Template> = [
  {
    id: '1',
    name: 'Funding In',
    shortName: 'sadas',
    context: 'accounts',
    inputs: [
      {
        name: 'amount',
        label: 'Amount',
        type: 'integer',
      },
      {
        name: 'currency',
        label: 'Currency',
        type: 'string',
      },
    ],
    operations: [
      {
        accountId: (accounts, custodies, values) => {
          return accounts[0].alias;
        },
        amount: (values) => Number(values['amount']),
      },
    ],
  },
];
