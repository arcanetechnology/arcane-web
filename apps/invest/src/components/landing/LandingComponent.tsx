/** @format */

import { JSXElement, FlowComponent, Show } from 'solid-js';
import invest from '../../assets/invest.svg';
import { Transition } from 'solid-transition-group';
import { isSmall } from '..';

type LandingProps = {
  children: JSXElement;
};

const Landing: FlowComponent<LandingProps> = (props) => {
  const base = { opacity: 1 };
  const options = { duration: 1000 };
  const animateIn = (el: Element, done: VoidFunction) => {
    el.animate(
      [{ opacity: 0, transform: 'translateY(25px)' }, base],
      options
    ).finished.then(done);
  };

  return (
    <>
      <section
        classList={{
          'margin-48': isSmall(),
          'margin-128': !isSmall(),
        }}
      >
        <div class="container" style={{ 'text-align': 'center' }}>
          <Transition onEnter={animateIn} appear={true}>
            <h2>
              Build generational wealth with our actively managed crypto fund.
            </h2>
          </Transition>
        </div>
      </section>

      <Transition onEnter={animateIn} appear={true || isSmall()}>
        <Show
          when={isSmall()}
          fallback={
            <section class="margin-32">
              <div id="apology-message" class="container" data-auto-grid="2">
                <div class="space-8">
                  <img src={invest} alt="invest-landing" />
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
          }
        >
          <section class="margin-48">
            <div id="apology-message" class="container" data-auto-grid="2">
              <div class="space-8 align-vertical">
                <h1>The fund.</h1>
                <h6 class="secondary-text">
                  Get managed exposure to cryptocurrencies as an asset class.
                </h6>
                <div class="margin-top-16">{props.children}</div>
              </div>
              <div class="space-8">
                <img src={invest} alt="invest-landing" />
              </div>
            </div>
          </section>
        </Show>
      </Transition>
    </>
  );
};

export default Landing;
