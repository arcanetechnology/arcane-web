/** @format */

import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config: FirebaseOptions = {
  apiKey: import.meta.env.ARCANE_WEB_API_KEY,
  authDomain: import.meta.env.ARCANE_WEB_AUTH_DOMAIN,
  projectId: import.meta.env.ARCANE_PROJECT_ID,
  storageBucket: import.meta.env.ARCANE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.ARCANE_MESSAGE_SENDER_ID,
  appId: import.meta.env.ARCANE_APP_ID,
};

const app = initializeApp(config, import.meta.env.APPLICATION_NAME);

const auth = getAuth(app);

export default auth;
