/** @format */

import { Show, VoidComponent } from 'solid-js';
import arcane from '../../assets/logo.svg';
import Navigation from '../navigation/Navigation';
import { Authentication } from '@arcane-web/arcane-components';

import './Header.scss';
import { isSmall } from '..';

const Header: VoidComponent = () => {
  return (
    <header role="banner" class="container">
      <img src={arcane} alt="arcane-logo" />
      <div style={{ 'flex-grow': 1 }} />
      <Navigation />
      <div>
        <Show when={!isSmall()}>
          <Authentication
            loggedOutTitle="Sign In"
            title="Sign Out"
            size="medium"
          />
        </Show>
      </div>
    </header>
  );
};

export default Header;
