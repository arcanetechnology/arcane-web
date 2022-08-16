/** @format */

import type { FlowComponent } from 'solid-js';

const Banner: FlowComponent = (props) => {
  return (
    <section class="margin-48">
      <div id="error" class="container" style={{ 'text-align': 'center' }}>
        {props.children}
      </div>
    </section>
  );
};

export default Banner;
