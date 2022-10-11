/** @format */

export const profileTypes = ['BUSINESS', 'PERSONAL'] as const;
export type ProfileTypes = typeof profileTypes[number];
export const accountTypes = ['stakeholder', 'custody', 'virtual'];
export type AccountTypes = typeof accountTypes[number];
export const currency = [
  'USD',
  'EUR',
  'GBP',
  'NOK',
  'SEK',
  'DKK',
  'CHF',
] as const;
export type Currency = typeof currency[number];
// perhaps update this with specific crypto types.
export type CryptoCurrency = string;

// actual entity
export type User = {
  id: string;
  createdOn: string;
};

// the way list api gives me each user
export type UserItem = Omit<User, 'profiles'>;

export type Profile = {
  id: string;
  alias: string;
  type: ProfileTypes;
};

// the way profiles api gives me each user
export type ProfileItem = Profile;

type Account = {
  id: string;
  alias: string;
  balance: number;
  reservedBalance: number;
};

type StakeholderAccount = {
  custodyAccountId: string;
};

type FiatAccount = {
  currency: Currency;
} & Account;

// schema for stakeholder fiat account
export type StakeholderFiatAccount = FiatAccount & StakeholderAccount;

// the way accounts api gives me each account
export type StakeholderFiatAccountItem = Omit<
  StakeholderFiatAccount,
  'portfolios'
>;

export type Portfolio = {
  id: string;
  alias: string;
  accounts: Array<string>;
};

// the way portfolios api gives me each portfolio
export type PortfolioItem = Omit<Portfolio, 'accounts'>;

type CryptoAccount = {
  currency: CryptoCurrency;
} & Account;

// schema for crypto account
export type StakeholderCryptoAccount = CryptoAccount & StakeholderAccount;

// schema for custody fiat
export type CustodyFiatAccount = FiatAccount;
// schema for custody crypto
export type CustodyCryptoAccount = CryptoAccount;

export type CustodyAccount = CustodyFiatAccount | CustodyCryptoAccount;

/**
 *  LEDGER TYPES
 */

export type Operation = {
  id: string;
  accountId: string;
  amount: number;
};

export type Transaction = {
  operations: Array<Operation>;
};
