/** @format */

import { VoidComponent } from 'solid-js';
import './base.scss';

const Base: VoidComponent = () => {
  return (
    <>
      <header id="arcane-header" role="banner"></header>
      <main id="arcane-app"></main>
      <footer id="arcane-footer"></footer>
    </>
  );
};

export default Base;
