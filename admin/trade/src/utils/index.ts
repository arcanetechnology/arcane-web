/** @format */

import {
  AccountOption,
  CryptoCurrency,
  Currency,
  FiatStakeholderAccount,
  Portfolio,
  Profile,
  TradeUser,
} from '@/types';

export function getAllUserAccountOptions(
  user: TradeUser
): Array<AccountOption> {
  const addProfilePrefix: boolean = user.profiles.length > 1;
  return user.profiles.flatMap((profile) => {
    const profilePrefix = addProfilePrefix
      ? `${profile.alias} ${profile.type} ≫ `
      : '';
    return getAllProfileAccountOptions(profile).map((accountOption) => ({
      ...accountOption,
      label: `${profilePrefix}${accountOption.label}`,
    }));
  });
}

export function getAllProfileAccountOptions(profile: Profile): AccountOption[] {
  return profile.accounts.flatMap((account) => {
    const accountPrefix = `${account.alias} ${account.currency}`;
    const accountOptions: AccountOption[] = [];
    accountOptions.push({
      id: account.id,
      label: accountPrefix,
      type: 'Fiat',
      balance: account.balance,
      currency: account.currency,
      custodyAccountId: account.fiatCustodyAccountId,
    });
    accountOptions.push(
      ...getAllStakeholderAccountOptions(account).map((accountOption) => ({
        ...accountOption,
        label: `${accountPrefix} ≫ ${accountOption.label}`,
      }))
    );
    return accountOptions;
  });
}

export function getAllStakeholderAccountOptions(
  account: FiatStakeholderAccount
): AccountOption[] {
  const addPortfolioPrefix = account.portfolios.length > 1;
  return account.portfolios.flatMap((portfolio) => {
    const portfolioPrefix = addPortfolioPrefix ? `${portfolio.alias} ≫ ` : '';
    return getAllPortfolioAccountOptions(portfolio).map((accountOption) => ({
      ...accountOption,
      label: `${portfolioPrefix}${accountOption.label}`,
    }));
  });
}

export function getAllPortfolioAccountOptions(
  portfolio: Portfolio
): AccountOption[] {
  return portfolio.cryptoAccounts.map((cryptoAccount) => ({
    id: cryptoAccount.id,
    label: `${cryptoAccount.alias} ${cryptoAccount.currency}`,
    type: 'Crypto',
    balance: cryptoAccount.balance,
    currency: cryptoAccount.currency,
    custodyAccountId: cryptoAccount.cryptoCustodyAccountId,
  }));
}

export const getAccountOptions = (
  accounts: Array<AccountOption>,
  selectedCurrency: Currency | CryptoCurrency | null = null,
  excludedAccountIds: Array<string> = [],
  excludedCurrencies: Array<Currency | CryptoCurrency> = []
) => {
  return (
    accounts
      // if selectedCurrency is present, filter accountOptions by selected selectedCurrency
      .filter(
        (accountOption) =>
          selectedCurrency == null || accountOption.currency == selectedCurrency
      )
      // exclude accountOptions with id in excludedAccountIds list
      .filter((accountOption) => !excludedAccountIds.includes(accountOption.id))
      // exclude accountOptions with currency in excludedCurrencies list
      .filter(
        (accountOption) => !excludedCurrencies.includes(accountOption.currency)
      )
  );
};

export const getAccount = (accounts: Array<AccountOption>, id: string) => {
  const account = accounts.find((a) => a.id === id);
  if (account) {
    return account;
  } else {
    throw new Error('account not found');
  }
};
