/** @format */

import { useContext } from 'solid-js';
import { ArcaneAuthContext } from './ArcaneAuthProvider';

export const useFirebaseApp = () => {
  const ctx = useContext(ArcaneAuthContext);

  if (!ctx)
    throw new Error(
      'useFirebaseApp must be used within a <ArcaneAuthContext.Provider />'
    );

  return ctx;
};
