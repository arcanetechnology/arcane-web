/** @format */
import { FlowComponent, JSXElement } from 'solid-js';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './Shell.module.scss';
import Cookie from '../cookie/Cookie';

type ShellProps = {
  children: JSXElement;
};

const Shell: FlowComponent<ShellProps> = (props) => {
  return (
    <div class={styles['shell']}>
      <Header />
      <main id="main-content" class={styles['mainContent']}>
        {props.children}
      </main>
      <Footer />
      <Cookie />
    </div>
  );
};

export default Shell;
