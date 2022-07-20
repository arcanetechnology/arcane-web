/** @format */

import type { VoidComponent } from 'solid-js';
import logo from '~/assets/logo.svg';
import { routeReadyState } from '~/utils';
import Navigation from '../navigation/Navigation';

import './Header.scss';

const Header: VoidComponent = () => {
  createEffect(() => {});
  createEffect(
    on(
      routeReadyState,
      (readyState) => {
        if (readyState.loading) return;
        console.log('loaded');
      },
      { defer: true }
    )
  );
  return (
    <header role="banner">
      <div class="container align-row margin-12">
        <img src={logo} alt="logo" />
        <div
          style={{
            'flex-grow': 1,
          }}
        />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
