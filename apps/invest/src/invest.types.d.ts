/** @format */

export type Country = {
  isO2CountyCode: string;
  isO3CountyCode: string;
  displayName: string;
  callingCountryCode: number;
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

export type MarketingAsset = {
  url: string;
};

export type FundMarketing = {
  name: string;
  image: MarketingAsset;
  description: { json: any };
};

export type FundInfo = {
  title: string;
  hero: FundMarketing;
  contact: FundMarketing;
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
