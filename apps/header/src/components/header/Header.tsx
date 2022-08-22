/** @format */

import { VoidComponent } from 'solid-js';
import classes from './Header.module.scss';
import { createScrollPosition } from '@solid-primitives/scroll';

const Header: VoidComponent = () => {
  const scroll = createScrollPosition();

  return (
    <div
      class={classes['header-parent']}
      classList={{
        [classes.sticky]: Boolean(scroll.y),
        [classes['scroll-height']]: Boolean(scroll.y),
      }}
    >
      <div class={`container ${classes.header}`}>
        <h6>logo</h6>
        <div style={{ 'flex-grow': 1 }} />
        <h6>navigation</h6>
        <div class={classes['auth-fixed-width']}>
          <h6>Auth</h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
