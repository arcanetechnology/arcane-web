/** @format */

export type AuthID = {
  uid: string;
};
export type AuthData = {
  email: string;
  photoUrl: string;
  displayName: string;
};

export type Auth = AuthID & Partial<AuthData>;
