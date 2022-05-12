/** @format */

import { Button } from '@arcane-web/alchemy';
import { JSXElement } from 'solid-js';

const Navigation = (): JSXElement => {
  return (
    <Button variant="text" id="navigation" onClick={(e) => console.log(e)}>
      navigate
    </Button>
  );
};

export default Navigation;
