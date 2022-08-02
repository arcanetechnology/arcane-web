/** @format */
import { createGraphQLClient, gql } from '@solid-primitives/graphql';
import { createResource } from 'solid-js';
import { Users } from '../types';
import { GetUserInfo } from '../types/api';

const trade = createGraphQLClient(
  'https://canary.api.arcane.no/apps/trade/admin/graphql'
);

export default trade;

export const getUserInfo = () => {
  return createResource(
    () =>
      new Promise<GetUserInfo>((resolve, _) => {
        setTimeout(() => {
          resolve({
            user: {
              id: 'foo',
              email: 'foo@foo.com',
              profiles: [
                {
                  id: 'firstSample',
                  alias: 'First Profile',
                  type: 'PERSONAL',
                  accounts: [
                    {
                      id: 'personalaccountid',
                      balance: 0,
                      currency: 'NOK',
                      alias: 'personal account',
                      portfolios: [
                        {
                          id: 'personalportfolioid',
                          alias: 'Personal Portfolio 1',
                          cryptoAccounts: [
                            {
                              id: 'cryptoaccountid',
                              balance: 0,
                              currency: 'BTC',
                              alias: 'Crypto Account 1',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'secondSample',
                  alias: 'Second Profile',
                  type: 'PERSONAL',
                  accounts: [
                    {
                      id: 'personalaccountid',
                      balance: 0,
                      currency: 'USD',
                      alias: 'personal account',
                      portfolios: [
                        {
                          id: 'personalportfolioid',
                          alias: 'Personal Portfolio 2',
                          cryptoAccounts: [
                            {
                              id: 'cryptoaccountid',
                              balance: 0,
                              currency: 'ETH',
                              alias: 'Crypto Account 2',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fiatCustodyAccounts: [
              {
                id: '',
                balance: 0,
                currency: 'NOK',
                alias: '',
              },
            ],
            cryptoCustodyAccounts: [
              {
                id: '',
                balance: 0,
                currency: 'BTC',
                alias: '',
              },
            ],
          });
        }, 1000);
      })
  );
};

// TODO: update it later to fetch users api

export const getUsers = () => {
  return createResource(
    () =>
      new Promise<Users>((resolve, _) => {
        setTimeout(() => {
          resolve([
            { id: 'foo', email: 'foo@foo.com' },
            { id: 'bar', email: 'bar@bar.com' },
            { id: 'zoo', email: 'zoo@zoo.com' },
          ]);
        }, 1000);
      })
  );
};
