/** @format */
import { createGraphQLClient } from '@solid-primitives/graphql';

const queryClient = createGraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_CONTENTFUL_SPACE
  }/environments/${import.meta.env.VITE_CONTENTFUL_ENVIRONMENT}`,
  { Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}` }
);

export default queryClient;
