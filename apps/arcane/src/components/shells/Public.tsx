/** @format */

import type { ParentComponent } from 'solid-js';
import Footer from '../footer/Footer';

const Public: ParentComponent = (props) => {
  return (
    <>
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Public;
