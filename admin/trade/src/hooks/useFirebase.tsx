/** @format */
import * as React from 'react';
import { login, logout, useTradeDispatch } from '@/state';
import { Auth, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { provider } from '@/services/firebase';

export const useFirebaseAuth = (auth: Auth) => {
  const dispatch = useTradeDispatch();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        signInWithRedirect(auth, provider).catch((err) => {
          dispatch(logout({}));
        });
      }
    });
  }, []);
};
