/** @format */

import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import {
  FiatStakeholderAccount as Account,
  CryptoStakeholderAccount as CryptoAccount,
  Currency,
  Portfolio,
  Profile,
  TradeUser,
} from '../../types';

const custodyAccounts: Array<string> = ['custody-1', 'custody-2', 'custody-3'];
const cryptoCustodyAccounts: Array<string> = [
  'crypto-custody-1',
  'crypto-custody-2',
  'crypto-custody-3',
];

const cryptoCurrency = [
  'ALGO',
  'REP',
  'BAT',
  'XBT',
  'BCH',
  'ADA',
  'LINK',
  'ATOM',
  'DAI',
  'XDG',
  'EOS',
  'ETH',
  'ETC',
  'GNO',
  'LTC',
  'NANO',
  'OMG',
  'OXT',
  'PAXG',
  'XRP',
  'XLM',
  'XTZ',
  'TRX',
  'DOT',
  'SOL',
  'MATIC',
  'USDT',
  'USDC',
  'AAVE',
  'UNI',
  'CRV',
  'COMP',
  'GRT',
  'SNX',
  'YFI',
  'MANA',
  'NMR',
  'SAND',
  'BUSD',
  'BNB',
  'FTT',
];

const currency = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK', 'CHF'];

const createRandomCryptoAccount = (): CryptoAccount[] => {
  return Array(getRandomIntInclusive(2, 5))
    .fill(0)
    .map(() => {
      return {
        ...getEntities(),
        balance: Number(faker.finance.amount(6)),
        currency: cryptoCurrency[getRandomInt(cryptoCurrency.length - 1)],
        cryptoCustodyAccountId:
          cryptoCustodyAccounts[getRandomInt(cryptoCustodyAccounts.length - 1)],
      };
    });
};

const getRandomPortfolios = (): Array<Portfolio> => {
  return Array(getRandomIntInclusive(1, 4))
    .fill(0)
    .map(() => {
      return {
        ...getEntities(),
        cryptoAccounts: createRandomCryptoAccount(),
      };
    });
};

const getRandomAccount = (): Array<Account> => {
  return Array(getRandomIntInclusive(1, 4))
    .fill(0)
    .map(() => {
      return {
        ...getEntities(),
        currency: currency[getRandomInt(currency.length - 1)] as Currency,
        balance: Number(faker.finance.amount(8)),
        fiatCustodyAccountId:
          custodyAccounts[getRandomInt(custodyAccounts.length - 1)],
        portfolios: getRandomPortfolios(),
      };
    });
};

const getRandomProfiles = (): Array<Profile> => {
  return Array(getRandomIntInclusive(1, 3))
    .fill(0)
    .map(() => {
      return {
        ...getEntities(),
        accounts: getRandomAccount(),
        type: faker.datatype.boolean() ? 'PERSONAL' : 'BUSINESS',
      };
    });
};

const getEntities = () => {
  const id = faker.datatype.uuid();
  const alias = faker.company.name() + '-' + id;
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
  // Array(13)
  //   .fill(0)
  //   .map((_, index) => {
  //     return {
  //       id: nanoid(),
  //       email: faker.internet.email(),
  //       profiles: getRandomProfiles(),
  //     };
  //   })
  [
    {
      id: 'user-id-uuid',
      email: 'test@arcane.no',
      profiles: [
        {
          id: 'profile-1-1',
          alias: 'Profile 1-1',
          type: 'PERSONAL',
          accounts: [
            {
              id: 'account 1-1-1',
              balance: 10000,
              currency: 'NOK',
              alias: 'Account 1-1-1',
              fiatCustodyAccountId: 'real-nok-sp1',
              portfolios: [
                {
                  id: 'portfolio 1-1-1-1',
                  alias: 'Portfolio 1-1-1-1',
                  cryptoAccounts: [
                    {
                      id: 'crypto 1-1-1-1-1',
                      balance: 10000,
                      currency: 'BTC',
                      alias: 'Crypto 1-1-1-1-1',
                      cryptoCustodyAccountId: 'real-btc-coinbase',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]
);

export default users;
