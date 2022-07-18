/** @format */

import { createGraphQLClient } from '@solid-primitives/graphql';
import server from 'solid-start/server';

const client = createGraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_PLATFORM_CONTENTFUL_SPACE
  }/environments/${import.meta.env.VITE_CONTENTFUL_ENVIRONMENT}`,
  {
    Authorization: `Bearer ${
      import.meta.env.VITE_PLATFORM_CONTENTFUL_ACCESS_TOKEN
    }`,
  },
  server.fetcher
);

export default client;
