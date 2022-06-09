/** @format */

import { VoidComponent } from 'solid-js';
import Users from './user';

if (import.meta.env.DEV) {
  console.log('starting mock');
  import('../../mocks/browser').then((browser) => {
    browser.worker.start();
  });
}

const Trade: VoidComponent = () => {
  return (
    <div>
      <Users />
    </div>
  );
};

export default Trade;
