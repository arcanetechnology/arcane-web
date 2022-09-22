/** @format */

// url path that goes on increasing as we traverse the db

export type UserPath = {
  userId: string;
};
export type ProfilePath = {
  profileId: string;
} & UserPath;

export type AccountPath = {
  accountId: string;
} & ProfilePath;

export type PortfolioPath = {
  portfolioId: string;
} & AccountPath;

export type CryptoPath = {
  cryptoId: string;
} & PortfolioPath;
