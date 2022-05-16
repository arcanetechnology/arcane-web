/** @format */

import contentful from 'contentful';

const client = contentful.createClient({
  space: import.meta.env.INVEST_CONTENTFUL_SPACE,
  accessToken: import.meta.env.INVEST_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.INVEST_CONTENTFUL_ENVIRONMENT,
});

export default client;
