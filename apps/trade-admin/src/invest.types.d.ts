/** @format */

export type Country = {
  name: string;
  flag: string;
  code: string;
  countryCode: string;
};

export type Countries = Array<Country>;

export type InfoCard = {
  title: string;
  caption: string;
};

export type InfoCards = Array<InfoCard>;

export type InfoCardsCollection = {
  items: InfoCards;
};

export type Asset = {
  name: string;
  units: number;
};

export type Assets = Array<Asset>;

export type AssetCollection = {
  items: Assets;
};

export type Chart = {
  title: string;
  url: string;
};

export type FundInfo = {
  title: string;
  infoCardsCollection: InfoCardsCollection;
  portfolioCollection: AssetCollection;
  chart: Chart;
};

export type FundInfos = Array<FundInfo>;

export type FundInfoCollection = {
  items: FundInfos;
};

export type GraphQLFundInfoResponse = {
  data: {
    fundInfoCollection: FundInfoCollection;
  };
};
