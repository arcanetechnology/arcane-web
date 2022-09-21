/** @format */

export type UserPath = {
  userId: string;
};

export type ProfilePath = {
  profileId: string;
} & UserPath;

export type AccountPath = {
  accountId: string;
} & ProfilePath;
