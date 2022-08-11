/** @format */

import { For, Show, VoidComponent, createSignal, createEffect } from 'solid-js';
import Twitter from '../../assets/twitter.svg';
import LinkedIn from '../../assets/linkedin.svg';
import './Footer.scss';
import Logo from '../../assets/logo.svg';
import { getNavigation } from '../../api/navigation';
import heart from '../../assets/heart.svg';
import { isSmall } from '..';

const Footer: VoidComponent = () => {
  const [sortedNavigation, setSortedNavigation] = createSignal([]);
  const nav = getNavigation();

  createEffect(() => {
    if (nav()) {
      const sorted = nav().applicationCollection.items.sort((a, b) => {
        return a.ranking - b.ranking;
      });
      setSortedNavigation(sorted);
    }
  });

  return (
    <footer>
      <div class="container">
        <div class="main-footer">
          <div class="icon">
            <img
              src={Logo}
              style={{
                filter: 'invert(1)',
              }}
            />
          </div>
          <div class="footer-navigation">
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
                            classList={{
                              after: !(
                                window.location.pathname.split('/')[1] ===
                                n.path
                              ),
                            }}
                            href={window.location.origin + '/' + (n.path ?? '')}
                          >
                            <p class="body1">{n.name}</p>
                            <Show
                              when={
                                window.location.pathname.split('/')[1] ===
                                n.path
                              }
                            >
                              <div class="arcane-footer-link" />
                            </Show>
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
                    <Show
                      when={window.location.pathname.split('/')[1] === 'people'}
                    >
                      <div class="arcane-footer-link" />
                    </Show>
                  </a>
                </div>
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after" href="/relations">
                    <p class="body1">Investor Relations</p>
                    <Show
                      when={
                        window.location.pathname.split('/')[1] === 'relations'
                      }
                    >
                      <div class="arcane-footer-link" />
                    </Show>
                  </a>
                </div>
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after" href="/privacy">
                    <p class="body1">Privacy</p>
                    <Show
                      when={
                        window.location.pathname.split('/')[1] === 'privacy'
                      }
                    >
                      <div class="arcane-footer-link" />
                    </Show>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="sub-footer">
          <div class="copyright">
            <p class="body3">© All rights reserved to Arcane.</p>
          </div>
          <div class="madeIn">
            <p style={{ 'padding-right': '8px' }} class="body3">
              Made with
            </p>
            <img src={heart} width={16} height={19} style={{ opacity: 0.4 }} />
            <p style={{ 'padding-left': '8px' }} class="body3">
              in Norway
            </p>
          </div>
          <div class="social">
            <Show when={!isSmall()}>
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
              <img
                src={Twitter}
                width={20}
                alt="twitter"
                style={{
                  filter: 'invert(1)',
                }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/arcane-crypto/"
              class="body3"
            >
              <img
                src={LinkedIn}
                width={20}
                alt="linkedin"
                style={{
                  filter: 'invert(1)',
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
