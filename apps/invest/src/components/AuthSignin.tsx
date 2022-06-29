/** @format */

import type { FirebaseOptions } from 'firebase/app';
import { Authentication } from '@arcane-web/arcane-components';
import { ArcaneAuthProvider } from '@arcane-web/arcane-auth';
import { VoidComponent } from 'solid-js';

type AuthSigninProps = {
  config: FirebaseOptions;
};

const AuthSigin: VoidComponent<AuthSigninProps> = (props) => {
  return (
    <ArcaneAuthProvider config={props.config}>
      <Authentication />
    </ArcaneAuthProvider>
  );
};

export default AuthSigin;
