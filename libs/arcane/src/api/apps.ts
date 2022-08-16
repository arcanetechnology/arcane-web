/** @format */

import { gql } from '@solid-primitives/graphql';
import client from './client';
import type { ApplicationCollection } from './types';

export const fetchAppsCollection = () => {
  const [apps] = client<ApplicationCollection>(
    gql`
      query {
        applicationCollection(limit: 20) {
          items {
            name
            logo {
              url
              description
            }
            path
          }
        }
      }
    `
  );

  return apps;
};
