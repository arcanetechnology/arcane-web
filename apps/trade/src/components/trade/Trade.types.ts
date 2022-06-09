/** @format */

type AccountTypes = 'personal' | 'business';
type CurrencyType = 'EUR' | 'GBP' | 'NOK' | 'SEK' | 'USD';
type CryptoCurrency = 'BTC' | 'ETH' | 'Doge';

interface Account {
  readonly userId: string;
  readonly alias: string;
  readonly accountId: string;
  readonly balance: number;
  readonly researvedBalance: number;
  readonly createdOn: string;
  readonly updatedOn: string;
}

export interface User {
  readonly userId: string;
  readonly createdOn: string;
}

export interface FiatAccount extends Account {
  readonly type: AccountTypes;
  readonly currency: CurrencyType;
}

export interface CryptoAccount extends Account {
  readonly fiatAccountId: string;
  readonly currency: CryptoCurrency;
}
