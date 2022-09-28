/** @format */

import React from 'react';
import { Params } from 'react-router-dom';

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

// global

export type CustodyPath = {
  custodyId: string;
};

// breadcrumb matches

export type TradeMatches = {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: {
    crumb: (data: Params<string>) => React.ReactNode;
  };
};
