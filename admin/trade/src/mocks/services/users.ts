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

function getRandomUsers(): Array<TradeUser> {
  return Array(13)
    .fill(0)
    .map((_, index) => {
      return {
        id: nanoid(),
        email: faker.internet.email(),
        profiles: getRandomProfiles(),
      };
    });
}

const adapter = createEntityAdapter<TradeUser>({
  selectId: (user) => user.id,
});

let users = adapter.getInitialState();
const initialData: Array<TradeUser> = [
  {
    id: 'user-id',
    email: 'test@arcane.no',
    profiles: [
      {
        id: 'profile-id',
        alias: 'Test Profile',
        type: 'PERSONAL',
        accounts: [
          {
            id: 'user-nok-sp1',
            balance: 10000,
            currency: 'NOK',
            alias: 'User NOK SP1',
            fiatCustodyAccountId: 'real-nok-sp1',
            portfolios: [],
          },
          {
            id: 'user-usd-sp1',
            balance: 10000,
            currency: 'USD',
            alias: 'User USD SP1',
            fiatCustodyAccountId: 'real-usd-sp1',
            portfolios: [
              {
                id: 'portfolio-id',
                alias: 'Test Portfolio',
                cryptoAccounts: [
                  {
                    id: 'user-eth-coinbase',
                    balance: 10000,
                    currency: 'ETH',
                    alias: 'User ETH Coinbase',
                    cryptoCustodyAccountId: 'real-eth-coinbase',
                  },
                  {
                    id: 'user-eth-metamask',
                    balance: 10000,
                    currency: 'ETH',
                    alias: 'User ETH Metamask',
                    cryptoCustodyAccountId: 'real-eth-metamask',
                  },
                  {
                    id: 'user-matic-metamask',
                    balance: 10000,
                    currency: 'MATIC',
                    alias: 'User MATIC Metamask',
                    cryptoCustodyAccountId: 'real-matic-metamask',
                  },
                  {
                    id: 'user-matic-ftx',
                    balance: 10000,
                    currency: 'MATIC',
                    alias: 'User MATIC FTX',
                    cryptoCustodyAccountId: 'real-matic-ftx',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

users = adapter.setAll(users, initialData);

export default users;
