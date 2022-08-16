/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';
import { Banner } from '@arcane-web/alchemy-solid';

const Login: VoidComponent = () => {
  return (
    <Public>
      <Banner>
        <h6>Login</h6>
      </Banner>
    </Public>
  );
};
export default Login;
