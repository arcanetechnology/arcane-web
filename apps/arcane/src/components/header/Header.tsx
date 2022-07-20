/** @format */

import type { VoidComponent } from 'solid-js';
import logo from '~/assets/logo.svg';
import { useAppContext } from '../contexts';
import Navigation from '../navigation/Navigation';

import './Header.scss';

const Header: VoidComponent = () => {
  const context = useAppContext();

  const getApps = createMemo(() => {
    const apps = context.apps;
    if (apps) {
      return apps;
    }
  });
  return (
    <header role="banner">
      <div class="container align-row margin-12">
        <img src={logo} alt="logo" />
        <div
          style={{
            'flex-grow': 1,
          }}
        />
        <Navigation apps={getApps()} />
      </div>
    </header>
  );
};

export default Header;
