/** @format */

import { Button } from '@arcane-web/alchemy';
import { Component } from 'solid-js';

const Navigation: Component = () => {
  return (
    <Button variant="text" id="navigation" onClick={(e) => console.log(e)}>
      navigate
    </Button>
  );
};

export default Navigation;
