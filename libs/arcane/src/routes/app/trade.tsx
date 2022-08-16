/** @format */

import type { VoidComponent } from 'solid-js';
import { Private } from '~/components';

// manually creating layout for each app, later it should be generated automatically.
const Trade: VoidComponent = () => {
  return (
    <Private>
      <fragment src="http://localhost:3000/app/" async />
      <div />
    </Private>
  );
};
export default Trade;
