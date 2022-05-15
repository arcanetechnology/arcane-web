/** @format */

import { Button } from '@arcane-web/alchemy';
import { Component } from 'solid-js';

const Authentication: Component = () => {
  return (
    <Button
      title="sign into arcane platform"
      variant="standard"
      id="auth"
      onClick={(e) => console.log(e)}
    >
      Signin
    </Button>
  );
};

export default Authentication;
