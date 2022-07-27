/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';
import { Banner } from '@arcane-web/alchemy-solid';

const People: VoidComponent = () => {
  return (
    <Public>
      <Banner>people</Banner>
    </Public>
  );
};

export default People;
