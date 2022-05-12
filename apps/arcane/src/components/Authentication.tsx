/** @format */

import { Button } from '@arcane-web/alchemy';
import { JSXElement } from 'solid-js';

const Authentication = (): JSXElement => {
  return (
    <Button variant="standard" id="auth" onClick={(e) => console.log(e)}>
      Signin
    </Button>
  );
};

export default Authentication;
