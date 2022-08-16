/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';
import { Banner } from '@arcane-web/alchemy-solid';

// manually creating layout for each app, later it should be generated automatically.
const Invest: VoidComponent = () => {
  return (
    <Public>
      <Banner>
        <h6>Invest App</h6>
      </Banner>
    </Public>
  );
};
export default Invest;
