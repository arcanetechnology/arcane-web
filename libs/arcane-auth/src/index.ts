/** @format */
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// base config for all apps that going to be the client of arcane.

type ArcaneConfig = {
  name: string;
} & FirebaseOptions;

const ArcaneApp = ({ name, ...props }: ArcaneConfig) => {
  return getAuth(initializeApp(props, name));
};

export default ArcaneApp;
