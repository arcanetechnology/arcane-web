/** @format */
// PROFILE

export const profileTypes = ['BUSINESS', 'PERSONAL'] as const;
export const currency = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK', 'CHF'];
export type ProfileTypes = typeof profileTypes[number];
export type Currency = typeof currency[number];
export type CryptoCurrency = string;

// USER TYPE
export type User = {
  id: string;
  email: string;
};

export type TradeUser = {
  profiles: Array<Profile>;
} & User;

export type Profile = {
  id: string;
  alias: string;
  type: ProfileTypes;
  accounts: Array<FiatStakeholderAccount>;
};

// PORTFOLIO

export type Portfolio = {
  id: string;
  alias: string;
  cryptoAccounts: Array<CryptoStakeholderAccount>;
};

// transaction object

export type TransactionCurrencyOperation = {
  account: string;
  amount: number;
};

export type TransactionCurrencyGroup = {
  operations: Array<TransactionCurrencyOperation>;
  currency: Currency | CryptoCurrency;
};

export type Transaction = {
  id: string;
  groups: Array<TransactionCurrencyGroup>;
};

// TODO accounts

// Accounts

type Account = {
  id: string;
  alias: string;
  balance: number;
};

type FiatAccount = {
  currency: Currency;
} & Account;

type CryptoAccount = {
  currency: CryptoCurrency;
} & Account;

type FiatCustodyAccount = FiatAccount;
type CryptoCustodyAccount = CryptoAccount;

export type FiatStakeholderAccount = {
  fiatCustodyAccountId: string;
  portfolios: Array<Portfolio>;
} & FiatAccount;

export type CryptoStakeholderAccount = {
  cryptoCustodyAccountId: string;
} & CryptoAccount;

export type VirtualAccount = {
  id: string;
  label: string;
  currency: string;
  allowNegative: boolean;
};

export type CustodyAccount = {
  id: string;
  alias: string;
  balance: number;
  currency: string;
};
