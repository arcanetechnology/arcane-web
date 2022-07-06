/** @format */

import { createSignal, Show, VoidComponent, For } from 'solid-js';
import { gql } from '@solid-primitives/graphql';
import client from '../../platform-contentful';
import './Navigation.scss';

type NavItems = {
  logo: { url: string; description: string };
  name: string;
  path: null | string;
};

const Navigation: VoidComponent = () => {
  const [navigation, setNavigation] = createSignal(false);
  const [nav] = client<{ applicationCollection: { items: Array<NavItems> } }>(
    gql`
      query {
        applicationCollection {
          items {
            name
            logo {
              url
              description
            }
            path
          }
        }
      }
    `
  );

  const toggleNavigation = (isHovering: boolean) => setNavigation(isHovering);

  return (
    <div
      id="menu-container"
      class="menu-container"
      data-is-closed="true"
      onClick={() => toggleNavigation(!navigation())}
    >
      <div id="menu-btn" class="menu-btn circle-hover">
        <abbr class="clear-df-abbr" title="Google applications">
          <svg viewBox="0 0 24 24">
            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
          </svg>
        </abbr>
      </div>
      <Show when={navigation()}>
        <div id="menu" class="menu margin-12">
          <Show when={nav()}>
            <nav class="gap-small" data-auto-grid="2">
              <For each={nav().applicationCollection.items}>
                {(n) => (
                  <div class="app-nav">
                    <a href={n.path}>
                      <img
                        width={40}
                        height={40}
                        src={n.logo.url}
                        alt={`${n.logo.description} logo`}
                      />
                    </a>
                    <p class="description">{n.name}</p>
                  </div>
                )}
              </For>
            </nav>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default Navigation;
