/** @format */

import { JSXElement, FlowComponent, Show } from 'solid-js';
import invest from '../../assets/invest.svg';
import { Transition } from 'solid-transition-group';
import { isSmall } from '..';

type LandingProps = {
  children: JSXElement;
};

const Landing: FlowComponent<LandingProps> = (props) => {
  return (
    <Transition
      onBeforeEnter={(el) => {
        el.style.opacity = '0';
      }}
      onEnter={(el, done) => {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(20px)', easing: 'ease-in' },
            { opacity: 1, easing: 'ease-in', transform: 'translateY(0)' },
          ],
          {
            duration: 400,
          }
        ).finished.then(() => {
          el.style.opacity = '1';
          done();
        });
      }}
      appear={true}
    >
      <div>
        <section
          classList={{
            'margin-48': isSmall(),
            'margin-96': !isSmall(),
          }}
        >
          <div class="container" style={{ 'text-align': 'center' }}>
            <h2>
              Build generational wealth with our actively managed crypto fund.
            </h2>
          </div>
        </section>

        <Show
          when={isSmall()}
          fallback={
            <section
              style={{ 'padding-bottom': isSmall() ? '124px' : '200px' }}
            >
              <div id="apology-message" class="container" data-auto-grid="2">
                <div class="space-8">
                  <img src={invest} alt="invest-landing" />
                </div>
                <div class="align-vertical">
                  <h1>The fund.</h1>
                  <h6 class="secondary-text">
                    Get managed exposure to cryptocurrencies as an asset class.
                  </h6>
                  <div class="margin-top-32">{props.children}</div>
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
      </div>
    </Transition>
  );
};

export default Landing;
