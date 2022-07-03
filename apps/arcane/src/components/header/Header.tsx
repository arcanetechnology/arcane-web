/** @format */

import type { VoidComponent } from 'solid-js';
import './Header.scss';

const Header: VoidComponent = () => {
  return (
    <header role="banner">
      <div class="container align-row margin-12">
        <h1>logo here</h1>
        <div
          style={{
            'flex-grow': 1,
          }}
        ></div>
        <h1>some stuff</h1>
      </div>
    </header>
  );
};

export default Header;
