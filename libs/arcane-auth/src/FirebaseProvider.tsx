/** @format */

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { JSX, ParentComponent } from 'solid-js';
import { createContext } from 'solid-js';

const FirebaseContext = createContext<FirebaseApp>();

interface FirebaseProviderProps {
  config: FirebaseOptions;
  children: JSX.Element;
}

export const FirebaseProvider: ParentComponent<FirebaseProviderProps> = (
  props
) => {
  return (
    <FirebaseContext.Provider
      value={initializeApp(props.config)}
      children={props.children}
    />
  );
};
