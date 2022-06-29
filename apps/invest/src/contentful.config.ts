/** @format */

import contentful from 'contentful';

export const investClient = contentful.createClient({
  space: import.meta.env.INVEST_CONTENTFUL_SPACE,
  accessToken: import.meta.env.INVEST_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.INVEST_CONTENTFUL_ENVIRONMENT,
});
