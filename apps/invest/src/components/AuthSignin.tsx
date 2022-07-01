/** @format */

import { Authentication } from '@arcane-web/arcane-components';
import { ArcaneAuthProvider } from '../components/auth';
import { VoidComponent } from 'solid-js';

const AuthSigin: VoidComponent = () => {
  return (
    <ArcaneAuthProvider>
      <Authentication />
    </ArcaneAuthProvider>
  );
};

export default AuthSigin;
