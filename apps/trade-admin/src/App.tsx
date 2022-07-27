/** @format */

import type { Component } from 'solid-js';
import { Banner, Button } from '@arcane-web/alchemy-solid';

const App: Component = () => {
  return (
    <>
      <Banner>
        <Button onClick={() => alert('in trade app')}>Helo</Button>
      </Banner>
    </>
  );
};

export default App;
