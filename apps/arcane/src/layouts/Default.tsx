/** @format */
import type { FlowComponent, JSXElement } from 'solid-js';
import { Footer, Header } from '../components';

type DefaultProps = {
  children: JSXElement;
};

const Default: FlowComponent<DefaultProps> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        height: '100%',
        'background-color': 'var(--background)',
      }}
    >
      <Header />
      <main id="main-content" style={{ flex: '1 0 auto' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Default;
