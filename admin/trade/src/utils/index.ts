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
import { darken, lighten } from '@mui/material';

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
  return portfolio.accounts.map((cryptoAccount) => ({
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

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringToAvatar = (name: string = 'error@error.com') => {
  if (!name) {
    return {
      width: 56,
      height: 56,
    };
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 56,
      height: 56,
    },
    children: `${name.split('@')[0][0]}${name.split('@')[1][0]}`.toUpperCase(),
  };
};

export function matchRuleExpl(str: string, rule: string) {
  const escapeRegex = (s: string) =>
    s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');

  // "."  => Find a single character, except newline or line terminator
  // ".*" => Matches any string that contains zero or more characters
  rule = rule.split('*').map(escapeRegex).join('.*');

  // "^"  => Matches any string with the following at the beginning of it
  // "$"  => Matches any string with that in front at the end of it
  rule = '^' + rule + '$';

  //Create a regular expression object for matching string
  const regex = new RegExp(rule);

  //Returns true if it finds a match, otherwise it returns false
  return regex.test(str);
}

export const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

export const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
