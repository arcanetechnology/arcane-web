/** @format */

import type { JSXElement, FlowComponent } from 'solid-js';
import Invest from '../../assets/invest.svg';
import { Transition } from 'solid-transition-group';

type LandingProps = {
  children: JSXElement;
};

const Landing: FlowComponent<LandingProps> = (props) => {
  const base = { opacity: 1 };
  const options = { duration: 1000 };
  const animateIn = (el) => {
    el.animate([{ opacity: 0 }, base], options);
  };

  return (
    <>
      <section class="margin-48">
        <div class="container" style={{ 'text-align': 'center' }}>
          <Transition onEnter={animateIn} appear={true}>
            <h2>
              Build generational wealth with our actively managed crypto fund.
            </h2>
          </Transition>
        </div>
      </section>
      <section class="margin-48">
        <div id="apology-message" class="container" data-auto-grid="2">
          <div class="space-8">
            <Invest />
          </div>
          <div class="space-8 align-vertical">
            <h1>The fund.</h1>
            <h6 class="secondary-text">
              Get managed exposure to cryptocurrencies as an asset class.
            </h6>
            <div class="margin-top-16">{props.children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
