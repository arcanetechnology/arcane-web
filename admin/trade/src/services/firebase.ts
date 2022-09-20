/** @format */

import type { FirebaseOptions } from 'firebase/app';
import firebase from 'firebase/app'; // include the Firebase module
import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  SAMLAuthProvider,
  signOut,
} from 'firebase/auth';

const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(config);
const auth = getAuth(app);
const provider = new SAMLAuthProvider(import.meta.env.VITE_SAML_PROVIDER_ID);

export { auth, provider, signInWithRedirect, getRedirectResult, signOut };
