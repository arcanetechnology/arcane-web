/** @format */

import { Show, VoidComponent } from 'solid-js';
import arcane from '../../assets/logo.svg';
import Navigation from '../navigation/Navigation';
import { Authentication } from '@arcane-web/arcane-components';
import './Header.scss';
import { isSmall } from '..';
import { createScrollPosition } from '@solid-primitives/scroll';
import { destructure } from '@solid-primitives/destructure';

const Header: VoidComponent = () => {
  const scroll = createScrollPosition();

  return (
    <header
      role="banner"
      classList={{
        sticky: Boolean(scroll.y),
        'scroll-height': Boolean(scroll.y),
      }}
    >
      <div class="container header">
        <img src={arcane} alt="arcane-logo" />
        <div style={{ 'flex-grow': 1 }} />
        <Navigation />
        <div class="auth-fixed-width">
          <Show when={!isSmall()}>
            <Authentication
              loggedOutTitle="Sign In"
              title="Sign Out"
              size="medium"
            />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
