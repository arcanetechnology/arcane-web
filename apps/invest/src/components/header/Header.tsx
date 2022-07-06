/** @format */

import type { VoidComponent } from 'solid-js';
import Arcane from '../../assets/logo.svg';
import Navigation from '../navigation/Navigation';
import { Authentication } from '@arcane-web/arcane-components';

import './Header.scss';

const Header: VoidComponent = () => {
  return (
    <header role="banner">
      <div class="container align-row margin-12">
        <Arcane />
        <div
          style={{
            'flex-grow': 1,
          }}
        />
        <Navigation />
        <Authentication loggedOutTitle="Sign In" title="Sign Out" />
      </div>
    </header>
  );
};

export default Header;
