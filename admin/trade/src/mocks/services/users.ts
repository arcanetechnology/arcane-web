/** @format */

import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import {
  Account,
  CryptoAccount,
  Currency,
  Portfolio,
  Profile,
  TradeUser,
} from '../../types';

const createRandomCryptoAccount = (): CryptoAccount[] => {
  const currency = ['BTC', 'ETH', 'LTE', 'DOGE', 'ONE', 'MATIC'];
  return Array(getRandomIntInclusive(11, 20))
    .fill(0)
    .map(() => {
      return {
        ...getEntities(),
        balance: Number(faker.finance.amount(6)),
        currency: currency[getRandomInt(currency.length - 1)],
      };
    });
};

const getRandomPortfolios = (): Array<Portfolio> => {
  return Array(getRandomIntInclusive(2, 9)).map(() => {
    return {
      ...getEntities(),
      cryptoAccounts: createRandomCryptoAccount(),
    };
  });
};

const getRandomAccount = (): Array<Account> => {
  return Array(getRandomIntInclusive(8, 15)).map(() => {
    return {
      ...getEntities(),
      currency: faker.finance.currencyCode() as Currency,
      balance: Number(faker.finance.amount(8)),
      portfolios: getRandomPortfolios(),
    };
  });
};

const getRandomProfiles = (): Array<Profile> => {
  return Array(getRandomIntInclusive(4, 12)).map(() => {
    return {
      ...getEntities(),
      accounts: getRandomAccount(),
      type: faker.datatype.boolean() ? 'PERSONAL' : 'PERSONAL',
    };
  });
};

const getEntities = () => {
  const id = faker.datatype.uuid();
  const alias = faker.commerce.productName() + '-' + id;
  return {
    id,
    alias,
  };
};

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const adapter = createEntityAdapter<TradeUser>({
  selectId: (user) => user.id,
});

let users = adapter.getInitialState();
users = adapter.setAll(
  users,
  Array(100)
    .fill(0)
    .map((_, index) => {
      return {
        id: nanoid(),
        email: faker.internet.email(),
        profiles: getRandomProfiles(),
      };
    })
);

export default users;
