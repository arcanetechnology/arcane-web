/** @format */

import { accounts, cryptoAccounts } from '@/constants';
import {
  accountTypes,
  CustodyAccount,
  CustodyCryptoAccount,
  CustodyFiatAccount,
  StakeholderCryptoAccount,
  StakeholderFiatAccount,
} from '../backend';
import { UnwrapArray } from '../util';

export const inputTypes = ['string', 'integer', 'boolean'] as const;
export const currencyKinds = ['fiat', 'crypto'] as const;
export const accountKinds = accountTypes.flatMap((a) =>
  currencyKinds.map((c) => `${a}-${c}` as const),
);
export type InputTypes = typeof inputTypes[number];
export type AccountKinds = typeof accountKinds[number];

export type TemplateInput = {
  name: string;
  label: string;
  type: InputTypes;
};

type Context = typeof accounts | typeof cryptoAccounts;

export type Template = {
  id: string;
  name: string;
  shortName: string;
  // change it to context
  context: Context;
  inputs: Array<TemplateInput>;
  operations: Array<TemplateOperation<Context>>;
};

export type StakeholderFiatAccounts = Array<StakeholderFiatAccount>;
export type StakeholderCryptoAccounts = Array<StakeholderCryptoAccount>;

export type AccountList<T extends Context> = T extends typeof accounts
  ? StakeholderFiatAccounts
  : T extends typeof cryptoAccounts
  ? StakeholderCryptoAccounts
  : never;

export type TemplateOperation<T extends Context> = {
  accountId: (
    account: AccountList<T>,
    custodies: Array<CustodyAccount>,
    inputs: Record<string, string | number | boolean>,
  ) => string;
  // TODO: put context which is exactly like routePaths defined incrementaly filling up data.
  amount: (
    context: any,
    inputs: Record<string, string | number | boolean>,
  ) => number;
};
