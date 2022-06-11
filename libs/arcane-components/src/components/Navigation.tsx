/** @format */

import { Button } from '@arcane-web/alchemy';
import { Component, createSignal, Show } from 'solid-js';

const Navigation: Component = () => {
  const [navigate, setNavigation] = createSignal<boolean>(false);

  return (
    <>
      <Button
        variant="tertiary"
        id="navigation"
        onMouseEnter={() => setNavigation(true)}
        onMouseLeave={() => setNavigation(false)}
        onClick={(e) => console.log(e)}
      >
        navigate
      </Button>
      <Show when={navigate()}>
        <div
          style={{ border: '1px solid #000', width: '100px', height: '300px' }}
        >
          hello
        </div>
      </Show>
    </>
  );
};

export default Navigation;
