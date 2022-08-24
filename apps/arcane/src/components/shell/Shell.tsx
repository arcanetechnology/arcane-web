/** @format */

import type { VoidComponent } from 'solid-js';
import classes from './Shell.module.scss';

const Shell: VoidComponent = () => {
  return (
    <div class={classes.shell}>
      <header class={classes.header} role="banner" id="arcane-header"></header>
      <main class={classes.main} id="arcane-app">
        <button onClick={() => alert('hello')}>I dont kno</button>
      </main>
      <footer class={classes.footer} id="arcane-footer"></footer>
    </div>
  );
};

export default Shell;
