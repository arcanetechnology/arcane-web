/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';

// manually creating layout for each app, later it should be generated automatically.
const Trade: VoidComponent = () => {
  return (
    <Public>
      <fragment async primary src="http://localhost:3000" />
    </Public>
  );
};
export default Trade;
