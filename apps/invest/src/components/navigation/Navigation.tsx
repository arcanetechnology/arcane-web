/** @format */

import { Show, VoidComponent, For, createSignal, createEffect } from 'solid-js';
import './Navigation.scss';
import { getNavigation } from '../../api/navigation';
import menu from '../../assets/menu.svg';
import { Authentication } from '@arcane-web/arcane-components';

const NAVIGATION_MENU_ID = 'arcane-header-navigation-menu';
const NAVIGATION_MENU_BUTTON_ID = 'arcane-header-navigation-menu-button';

function composedPath(el) {
  const path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}

// TODO: global?
const Navigation: VoidComponent = () => {
  const [sortedNavigation, setSortedNavigation] = createSignal([]);
  const nav = getNavigation();

  createEffect(() => {
    if (nav()) {
      const sorted = nav().applicationCollection.items.sort((a, b) => {
        return a.ranking - b.ranking;
      });
      setSortedNavigation(sorted);
    }
  });

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
        if (navigationMenu) {
          navigationMenu.style.visibility = 'hidden';
          navigationMenuButton.classList.remove('arcane-button-menu-active');
        }
      }
    });

    el.addEventListener('click', () => {
      const getNavigationMenu = document.getElementById(NAVIGATION_MENU_ID);
      const navigationMenuButton = document.getElementById(
        NAVIGATION_MENU_BUTTON_ID
      );
      if (getNavigationMenu) {
        getNavigationMenu.style.visibility = 'visible';
        navigationMenuButton.classList.add('arcane-button-menu-active');
      }
    });
  };

  return (
    <div
      ref={navigationRef}
      id="menu-container"
      class="menu-container"
      data-is-closed="true"
    >
      <button
        id={NAVIGATION_MENU_BUTTON_ID}
        class="arcane-navigation-menu-button"
      >
        <img width={40} height={40} src={menu} alt="Arcane Applications" />
      </button>
      <div id={NAVIGATION_MENU_ID} class="menu">
        <Show when={sortedNavigation().length > 0}>
          <nav class="app-box">
            <For each={sortedNavigation()}>
              {(n) => (
                <div
                  class="app-nav"
                  style={{
                    opacity:
                      window.location.pathname.split('/')[1] === n.path
                        ? 1
                        : 0.4,
                  }}
                >
                  <a
                    class="app-nav-link"
                    href={window.location.origin + '/' + (n.path ?? '')}
                  >
                    <img
                      width={30}
                      height={30}
                      src={n.logo.url}
                      alt={`${n.logo.description} logo`}
                    />
                  </a>

                  <div class="padding-2">
                    <p class="caption">{n.name}</p>
                  </div>
                </div>
              )}
            </For>
          </nav>
        </Show>
        <div class="w-full">
          <div style={{ width: '90px' }}>
            <Authentication
              class="w-full"
              loggedOutTitle="Sign In"
              title="Sign Out"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
