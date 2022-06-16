/** @format */

import type { FirebaseOptions } from 'firebase/app';

const config: FirebaseOptions = {
  apiKey: process.env['FIREBASE_WEB_API_KEY'],
  authDomain: process.env['FIREBASE_WEB_AUTH_DOMAIN'],
  projectId: process.env['FIREBASE_PROJECT_ID'],
  storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: process.env['FIREBASE_MESSAGE_SENDER_ID'],
  appId: process.env['FIREBASE_APP_ID'],
};

export default config;

