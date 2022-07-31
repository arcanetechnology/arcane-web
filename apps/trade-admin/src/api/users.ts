/** @format */
import { createGraphQLClient, gql } from '@solid-primitives/graphql';
import { createResource } from 'solid-js';
import { Users } from '../types';

const trade = createGraphQLClient(
  'https://canary.api.arcane.no/apps/trade/admin/graphql'
);

export default trade;

export const getUserInfo = (userId: string) => {
  return trade(gql`
    query data($userId: ID!) {
      users {
        id
        email
      }
      user(userid: $userId) {
        id
        email
        createdOn
        profiles {
          id
          alias
          type
          createdOn
          updatedOn
          accounts {
            id
            balance
            currency
            alias
            createdOn
            updatedOn
            portfolios {
              id
              alias
              createdOn
              updatedOn
              cryptoAccounts {
                id
                balance
                currency
                alias
                createdOn
                updatedOn
              }
            }
          }
        }
      }
      fiatCustodyAccounts {
        id
        balance
        currency
        alias
        createdOn
        updatedOn
      }
      cryptoCustodyAccounts {
        id
        balance
        currency
        alias
        createdOn
        updatedOn
      }
    }
  `);
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
