/** @format */

import type { ParentComponent } from 'solid-js';
import Footer from '../footer/Footer';

const Public: ParentComponent = (props) => {
  return (
    <>
      <main style={{ flex: '1 0 auto' }}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Public;
