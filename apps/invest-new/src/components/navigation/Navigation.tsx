/** @format */

import { createSignal, Show, VoidComponent } from 'solid-js';

const Navigation: VoidComponent = () => {
  const [navigation, setNavigation] = createSignal(false);

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
            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
          </svg>
        </abbr>
      </div>
      <Show when={navigation()}>
        <div id="menu" class="menu margin-12">
          navigation
        </div>
      </Show>
    </div>
  );
};

export default Navigation;
