/** @format */
import { initializeApp } from 'firebase/app';
import config from './firebase.config';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

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

/**
 * @param {string} url The URL whose origin is to be returned.
 * @return {string} The origin corresponding to given URL.
 */
const getOriginFromUrl = (url: string) => {
  // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
  const pathArray = url.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  return protocol + '//' + host;
};

self.addEventListener('install', (event) => {
  // Perform install steps.
  console.log('custom service worker');
});
