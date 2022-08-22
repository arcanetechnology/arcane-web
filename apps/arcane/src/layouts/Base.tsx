/** @format */

import { VoidComponent } from 'solid-js';
import './base.scss';

type BaseProps = {
  header: string;
  footer: string;
};

const Base: VoidComponent<BaseProps> = (props) => {
  return (
    <>
      <header
        id="arcane-header"
        role="banner"
        innerHTML={props.header}
      ></header>
      <main id="arcane-app"></main>
      <footer id="arcane-footer" innerHTML={props.footer}></footer>
    </>
  );
};

export default Base;
