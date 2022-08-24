/** @format */

import type { VoidComponent } from 'solid-js';
import classes from './Navigation.module.scss';
import Menu from '../../assets/menu.svg';

const NAVIGATION_MENU_ID = 'arcane-header-navigation-menu';
const NAVIGATION_MENU_BUTTON_ID = 'arcane-header-navigation-menu-button';

function composedPath(el: Element) {
  const path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement!;
  }
}

// TODO: global?
const Navigation: VoidComponent = () => {
  const navigationRef: (el: HTMLDivElement) => void = (el: HTMLDivElement) => {
    document.addEventListener('click', (e: any) => {
      const navigationMenu = document.getElementById(NAVIGATION_MENU_ID);
      const navigationMenuButton = document.getElementById(
        NAVIGATION_MENU_BUTTON_ID
      );

      // weird shit, have to do cos it doesn't work in ff and safari
      const path =
        e.path ||
        (e.composedPath && e.composedPath()) ||
        composedPath(e.target);
      const includesMenu = !path.includes(navigationMenu);
      const includesMenuBtn = !path.includes(navigationMenuButton);
      if (includesMenu && includesMenuBtn) {
        if (navigationMenu && navigationMenuButton) {
          navigationMenu.style.visibility = 'hidden';
          navigationMenuButton.classList.remove(
            classes['arcane-button-menu-active']!
          );
        }
      }
    });

    el.addEventListener('click', () => {
      const getNavigationMenu = document.getElementById(NAVIGATION_MENU_ID);
      const navigationMenuButton = document.getElementById(
        NAVIGATION_MENU_BUTTON_ID
      );
      if (getNavigationMenu && navigationMenuButton) {
        getNavigationMenu.style.visibility = 'visible';
        navigationMenuButton.classList.add(
          classes['arcane-button-menu-active']!
        );
      }
    });
  };

  return (
    <div
      ref={navigationRef}
      id="menu-container"
      class={classes['menu-container']}
      data-is-closed="true"
    >
      <button
        id={NAVIGATION_MENU_BUTTON_ID}
        class={classes['arcane-navigation-menu-button']}
      >
        <Menu />
      </button>
      <div id={NAVIGATION_MENU_ID} class={classes['menu']}>
        <div class="w-full">
          <h6>Auth</h6>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
