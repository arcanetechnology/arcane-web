/** @format */

import { Show, VoidComponent, For } from 'solid-js';
import './Navigation.scss';
import { getNavigation } from '../../api/navigation';
import menu from '../../assets/menu.svg';

const NAVIGATION_MENU_ID = 'arcane-header-navigation-menu';
const NAVIGATION_MENU_BUTTON_ID = 'arcane-header-navigation-menu-button';

const Navigation: VoidComponent = () => {
  const nav = getNavigation();

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
      <div id={NAVIGATION_MENU_ID} class="menu margin-12">
        <Show when={nav()}>
          <nav class="gap-small" data-auto-grid="2">
            <For each={nav().applicationCollection.items}>
              {(n) => (
                <div class="app-nav">
                  <a
                    class="app-nav-link"
                    href={window.location.origin + '/' + (n.path ?? '')}
                  >
                    <img
                      width={40}
                      height={40}
                      src={n.logo.url}
                      alt={`${n.logo.description} logo`}
                    />
                  </a>

                  <p class="button-small">{n.name}</p>
                </div>
              )}
            </For>
          </nav>
        </Show>
      </div>
    </div>
  );
};

export default Navigation;
