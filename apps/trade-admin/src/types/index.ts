/** @format */
export * from './api';

export type ProfileTypes = 'PERSONAL' | 'BUSINESS';

export type FiatCurrency = 'NOK' | 'USD';
export type CryptoCurrency = 'BTC' | 'ETH';

export type BaseUser = {
  id: string;
  email: string;
};

export type UserProfile = {
  profiles: Array<Profile>;
} & BaseUser;

export type Users = Array<BaseUser>;

export type CurrencyAccount = {
  id: string;
  alias: string;
  balance: number;
};

export type CryptoAccount = {
  currency: CryptoCurrency;
} & CurrencyAccount;

export type Portfolio = {
  id: string;
  alias: string;
  cryptoAccounts: Array<CryptoAccount>;
};

export type Account = {
  currency: FiatCurrency;
} & CurrencyAccount;

export type ProfileAccount = {
  portfolios: Array<Portfolio>;
} & Account;

export type Profile = {
  id: string;
  alias: string;
  type: ProfileTypes;
  accounts: Array<ProfileAccount>;
};

export type FiatCustodyAccount = Array<Account>;
export type CryptoCustodyAccount = Array<CryptoAccount>;
