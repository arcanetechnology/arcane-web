/** @format */

import type { JSXElement, FlowComponent } from 'solid-js';
import Invest from '../../assets/invest.svg';

type LandingProps = {
  children: JSXElement;
};

const Landing: FlowComponent<LandingProps> = (props) => {
  return (
    <>
      <section class="margin-48">
        <div class="container" style={{ 'text-align': 'center' }}>
          <h2>
            Build generational wealth with our actively managed crypto fund.
          </h2>
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
