/** @format */
import { initializeApp } from 'firebase/app';
import config from './config';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

console.log(config);

initializeApp(config);

const auth = getAuth();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user signed in', user.uid);
  } else {
    console.log('user signed out');
  }
});

const getIdTokenPromise = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        getIdToken(user).then(
          (idToken) => {
            resolve(idToken);
          },
          (error) => {
            resolve(null);
          }
        );
      } else {
        resolve(null);
      }
    });
  });
};

self.addEventListener('install', (event) => {
  // Perform install steps.
  console.log('custom service worker');
});
