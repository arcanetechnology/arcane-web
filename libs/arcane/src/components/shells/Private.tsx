/** @format */

import type { ParentComponent } from 'solid-js';

const Private: ParentComponent = (props) => {
  return (
    <>
      <main style={{ flex: '1 0 auto' }}>{props.children}</main>
    </>
  );
};

export default Private;
