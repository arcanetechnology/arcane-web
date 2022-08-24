/** @format */

import { Show, VoidComponent } from 'solid-js';
import Logo from './assets/logo.svg';
import classes from './App.module.scss';
import { createScrollPosition } from '@solid-primitives/scroll';
import { createMediaQuery } from '@solid-primitives/media';
import { Navigation, SignIn } from './components';

const isSmall = createMediaQuery('(max-width: 767px)');

const App: VoidComponent = () => {
  const scroll = createScrollPosition();
  return (
    <div
      class={classes['header-parent']}
      classList={{
        [`${classes['sticky']}`]: Boolean(scroll.y),
        [`${classes['scroll-height']}`]: Boolean(scroll.y),
      }}
    >
      <div class={`container ${classes['header']}`}>
        <Logo />
        <div style={{ 'flex-grow': 1 }} />
        <Navigation />
        <Show when={!isSmall()}>
          <div class={classes['auth-fixed-width']}>
            <SignIn />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default App;
