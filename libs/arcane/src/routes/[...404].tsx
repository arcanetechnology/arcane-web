/** @format */

import { NotFound, Public } from '~/components';

export default () => {
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
