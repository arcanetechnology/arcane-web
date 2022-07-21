/** @format */

import type { VoidComponent } from 'solid-js';
import logo from '~/assets/logo.svg';
import Navigation from '../navigation/Navigation';

import './Header.scss';

const Header: VoidComponent = () => {
  return (
    <>
      <header role="banner">
        <div class="container align-row margin-12">
          <Transition onEnter={onLogoEnter} appear={!isServer}>
            <img src={logo} alt="logo" />
          </Transition>

          <div
            style={{
              'flex-grow': 1,
            }}
          />
          <Navigation />
        </div>
      </header>
    </>
  );
};

const base = { opacity: 1 };
const options = { duration: 1300 };
const onLogoEnter = (el: Element, done: VoidFunction) => {
  el.animate([{ opacity: 0 }, base], options).finished.then(done);
};

export default Header;
