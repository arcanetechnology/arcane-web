/** @format */

import { For, Show, VoidComponent, createSignal, createEffect } from 'solid-js';
import Twitter from '../assets/twitter.svg';
import LinkedIn from '../assets/linkedin.svg';
import Logo from '../assets/logo.svg';
import Heart from '../assets/heart.svg';
import classes from './Footer.module.scss';
import { useLocation } from '@solidjs/router';

// TODO: IMPORTANT!!!!! REMOVE FOLLOW US WITH IS SMALL IMPLEMENTATION

const Footer: VoidComponent = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [sortedNavigation, setSortedNavigation] = createSignal([]);
  const location = useLocation();
  createEffect(() => {
    console.log(location.pathname);
  });

  return (
    <>
      <div class="container">
        <div class={classes['main-footer']}>
          <div class="icon">
            <Logo />
          </div>
          <div class={classes['footer-navigation']}>
            <div>
              <p class="heading8">Menu</p>
              <nav id="arcane-application-navigation" class="align-vertical">
                <Show when={sortedNavigation().length > 0}>
                  {
                    <For each={sortedNavigation()}>
                      {(n) => (
                        <div style={{ 'margin-top': '16px' }}>
                          <a
                            class="third after"
                            // classList={{
                            //   after: isBrowser()
                            //     ? !(
                            //         window.location.pathname.split('/')[1] ===
                            //         n.path
                            //       )
                            //     : false,
                            // }}
                            href={'/' + (n.path ?? '')}
                          >
                            <p class="body1">{n.name}</p>
                            {/* <Show
                              when={
                                isBrowser
                                  ? window.location.pathname.split('/')[1] ===
                                    n.path
                                  : false
                              }
                            >
                              <div class={classes['arcane-footer-link']} />
                            </Show> */}
                          </a>
                        </div>
                      )}
                    </For>
                  }
                </Show>
              </nav>
            </div>
            <div>
              <p class="heading8 footer-text">Company</p>
              <nav id="arcane-static" class="align-vertical">
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after" href="/people">
                    <p class="body1">People</p>
                    {/* <Show
                      when={
                        isBrowser()
                          ? window.location.pathname.split('/')[1] === 'people'
                          : false
                      }
                    >
                      <div class={classes['arcane-footer-link']} />
                    </Show> */}
                  </a>
                </div>
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after" href="/relations">
                    <p class="body1">Investor Relations</p>
                    {/* <Show
                      when={
                        isBrowser
                          ? window.location.pathname.split('/')[1] ===
                            'relations'
                          : false
                      }
                    >
                      <div class={classes['arcane-footer-link']} />
                    </Show> */}
                  </a>
                </div>
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after" href="/privacy">
                    <p class="body1">Privacy</p>
                    {/* <Show
                      when={
                        isBrowser
                          ? window.location.pathname.split('/')[1] === 'privacy'
                          : false
                      }
                    >
                      <div class={classes['arcane-footer-link']} />
                    </Show> */}
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class={classes['sub-footer']}>
          <div class="copyright">
            <p class="body3">© All rights reserved to Arcane.</p>
          </div>
          <div class="madeIn">
            <p style={{ 'padding-right': '8px' }} class="body3">
              Made with
            </p>
            <Heart />
            <p style={{ 'padding-left': '8px' }} class="body3">
              in Norway
            </p>
          </div>
          <div class="social">
            <Show when={true}>
              <p
                class="body3"
                style={{
                  'margin-right': '16px',
                  'padding-top': '6px',
                }}
              >
                Follow us
              </p>
            </Show>
            <a href="https://twitter.com/arcane_crypto">
              <Twitter />
            </a>
            <a
              href="https://www.linkedin.com/company/arcane-crypto/"
              class="body3"
            >
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
