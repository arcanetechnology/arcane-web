/** @format */

import { JSXElement } from 'solid-js';
import { Button } from '@arcane-web/alchemy';

const ThemeToggle = (): JSXElement => {
  return (
    <Button
      onClick={(e) => {
        console.log('hello');
      }}
      class="standard"
    >
      Hello
    </Button>
  );
};

export default ThemeToggle;
