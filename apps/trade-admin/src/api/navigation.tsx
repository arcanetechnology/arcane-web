/** @format */

import { gql } from '@solid-primitives/graphql';
import client from '../platform-contentful';
type NavItems = {
  logo: { url: string; description: string };
  name: string;
  path: null | string;
};

export const getNavigation = () => {
  const [nav] = client<{ applicationCollection: { items: Array<NavItems> } }>(
    gql`
      query {
        applicationCollection {
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

  return nav;
};
