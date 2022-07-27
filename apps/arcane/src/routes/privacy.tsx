/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';
import { Banner } from '@arcane-web/alchemy-solid';

const Privacy: VoidComponent = () => {
  return (
    <Public>
      <Banner>privacy</Banner>
    </Public>
  );
};

export default Privacy;
