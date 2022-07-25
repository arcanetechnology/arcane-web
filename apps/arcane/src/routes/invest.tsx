/** @format */

import type { VoidComponent } from 'solid-js';
import { Banner, Public } from '~/components';

// manually creating layout for each app, later it should be generated automatically.
const Invest: VoidComponent = () => {
  return (
    <Public>
      <Banner>
        <h6>Login</h6>
      </Banner>
    </Public>
  );
};
export default Invest;
