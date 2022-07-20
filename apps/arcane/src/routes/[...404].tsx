/** @format */

import type { Component } from 'solid-js';
import { NotFound, Public } from '~/components';

const FourOhFour: Component = () => {
  return (
    <Public>
      <section class="margin-48">
        <div id="error" class="container" style={{ 'text-align': 'center' }}>
          <NotFound />
        </div>
      </section>
    </Public>
  );
};

export default FourOhFour;
