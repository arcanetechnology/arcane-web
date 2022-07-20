/** @format */

import type { VoidComponent } from 'solid-js';
import type { Apps } from '~/types';
import './Navigation.scss';

type NavigationProps = {
  apps: Apps | undefined;
};

const NAVIGATION_MENU_ID = 'arcane-header-navigation-menu';
const NAVIGATION_MENU_BUTTON_ID = 'arcane-header-navigation-menu-button';

const Navigation: VoidComponent<NavigationProps> = (props) => {
  const [t] = useI18n();

  let navigationRef: (el: HTMLDivElement) => void = (el: HTMLDivElement) => {
    const navigationMenu = document.getElementById(NAVIGATION_MENU_ID);
    const navigationMenuButton = document.getElementById(
      NAVIGATION_MENU_BUTTON_ID
    );

    document.addEventListener('click', (e: any) => {
      const includesMenu = !e.path.includes(navigationMenu);
      const includesMenuBtn = !e.path.includes(navigationMenuButton);
      if (includesMenu && includesMenuBtn) {
        if (navigationMenu) {
          navigationMenu.style.visibility = 'hidden';
        }
      }
    });

    el.addEventListener('click', () => {
      console.log(navigationMenu);
      if (navigationMenu) {
        navigationMenu.style.visibility = 'visible';
      }
    });
  };

  return (
    <div id="menu-container" class="menu-container" data-is-closed="true">
      <div
        ref={navigationRef}
        id={NAVIGATION_MENU_BUTTON_ID}
        class="menu-btn circle-hover"
      >
        <abbr
          class="clear-df-abbr"
          title={t('global.apps.title', {}, 'Arcane Apps')}
        >
          <svg viewBox="0 0 24 24">
            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
          </svg>
        </abbr>
      </div>
      <div id={NAVIGATION_MENU_ID} class="menu margin-12">
        <nav class="gap-small" data-auto-grid="2">
          <For each={props.apps}>
            {(n) => (
              <div class="app-nav">
                <Link class="app-nav-link" href={'/' + (n.path ?? '')}>
                  <img
                    width={40}
                    height={40}
                    src={n.logo.url}
                    alt={`${n.logo.description} logo`}
                  />
                </Link>
                <p class="button-small">{n.name}</p>
              </div>
            )}
          </For>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
