/** @format */

import { FirebaseApp, getApp } from 'firebase/app';
import { JSX, ParentComponent } from 'solid-js';
import { createContext } from 'solid-js';

const FirebaseContext = createContext<FirebaseApp>();

interface FirebaseProviderProps {
  children: JSX.Element;
}

export const ArcaneAuthProvider: ParentComponent<FirebaseProviderProps> = (
  props
) => {
  return (
    <FirebaseContext.Provider value={getApp()}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
