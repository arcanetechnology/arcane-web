/** @format */

export const profileTypes = ['BUSINESS', 'PERSONAL'] as const;
export type ProfileTypes = typeof profileTypes[number];
export const accountTypes = ['stakeholder', 'custody', 'virtual'];
export type AccountTypes = typeof accountTypes[number];
export const currency = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK', 'CHF'];
export type Currency = typeof currency[number];
// perhaps update this with specific crypto types.
export type CryptoCurrency = string;

// actual entity
export type User = {
  id: string;
  email: string;
  profiles: Array<string>;
};

// the way list api gives me each user
export type UserItem = Omit<User, 'profiles'>;

export type Profile = {
  id: string;
  alias: string;
  type: ProfileTypes;
  accounts: Array<string>;
};

// the way profiles api gives me each user
export type ProfileItem = Omit<Profile, 'accounts'>;

type Account = {
  id: string;
  alias: string;
  balance: number;
  custodyAccountId: string;
};

type FiatAccount = {
  portfolio: Array<string>;
  currency: Currency;
} & Account;

export type StakeholderFiatAccount = FiatAccount;

// the way accounts api gives me each account
export type StakeholderFiatAccountItem = Omit<
  StakeholderFiatAccount,
  'portfolio'
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

export type StakeholderCryptoAccount = CryptoAccount;
