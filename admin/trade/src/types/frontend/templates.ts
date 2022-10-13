/** @format */

import {
  accountTypes,
  CustodyCryptoAccount,
  CustodyFiatAccount,
  StakeholderCryptoAccount,
  StakeholderFiatAccount,
} from '../backend';
import { UnwrapArray } from '../util';

export const inputTypes = ['string', 'number'] as const;
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

export type Template = {
  id: string;
  name: string;
  inputs: Array<TemplateInput>;
};
