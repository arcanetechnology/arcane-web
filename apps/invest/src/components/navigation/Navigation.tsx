/** @format */

import {
  Show,
  VoidComponent,
  For,
  createSignal,
  onMount,
  createEffect,
} from 'solid-js';
import './Navigation.scss';
import { getNavigation } from '../../api/navigation';
import menu from '../../assets/menu.svg';
import { Authentication } from '@arcane-web/arcane-components';

const NAVIGATION_MENU_ID = 'arcane-header-navigation-menu';
const NAVIGATION_MENU_BUTTON_ID = 'arcane-header-navigation-menu-button';

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
      const includesMenu = !e.path.includes(navigationMenu);
      const includesMenuBtn = !e.path.includes(navigationMenuButton);
      if (includesMenu && includesMenuBtn) {
        if (navigationMenu) {
          navigationMenu.style.visibility = 'hidden';
        }
      }
    });

    el.addEventListener('click', () => {
      const getNavigationMenu = document.getElementById(NAVIGATION_MENU_ID);
      if (getNavigationMenu) {
        getNavigationMenu.style.visibility = 'visible';
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
      <div id={NAVIGATION_MENU_BUTTON_ID} class="menu-btn circle-hover">
        <abbr title="Arcane applications">
          <img src={menu} alt="Arcane Applications" />
        </abbr>
      </div>
      <div id={NAVIGATION_MENU_ID} class="menu margin-8">
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

                  <div>{n.name}</div>
                </div>
              )}
            </For>
          </nav>
        </Show>
        <div>
          <Authentication
            loggedOutTitle="Sign In"
            title="Sign Out"
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
