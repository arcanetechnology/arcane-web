/** @format */

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { JSX, ParentComponent } from 'solid-js';
import { createContext } from 'solid-js';

export const ArcaneAuthContext = createContext<FirebaseApp>();

interface FirebaseProviderProps {
  config: FirebaseOptions;
  name: string;
  children: JSX.Element;
}

export const ArcaneAuthProvider: ParentComponent<FirebaseProviderProps> = (
  props
) => {
  return (
    <ArcaneAuthContext.Provider value={initializeApp(props.config)}>
      {props.children}
    </ArcaneAuthContext.Provider>
  );
};
