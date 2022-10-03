/** @format */

export type User = {
  userId: string;
  analyticsId: string;
  email: string;
};

export type Admin = {
  uid: string;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
};
