/** @format */

import { Button } from '@arcane-web/alchemy';
import { JSXElement } from 'solid-js';

const ThemeToggle = (): JSXElement => {
  return <Button onClick={(e) => console.log(e)}>theme</Button>;
};

export default ThemeToggle;
