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
            <div style={{ 'margin-right': '96px' }}>
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
            <div style={{ 'margin-right': '96px' }}>
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
          <div class="copyright">© All rights reserved to Arcane.</div>
          <div class="madeIn">
            <p style={{ 'padding-right': '4px' }}>Made with</p>
            <img src={heart} width={15} height={19} style={{ opacity: 0.4 }} />
            <p style={{ 'padding-left': '4px' }}>in Norway</p>
          </div>
          <div class="social">
            <Show when={!isSmall()}>
              {' '}
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
      {/* <div
        class="container margin-48 padding-24 gap-small"
        classList={{
          'footer-row': !isSmall(),
          'footer-side': isSmall(),
          'gap-big': !isSmall(),
          'gap-small': isSmall(),
        }}
      >
        <div class="padding-4">
          <img
            src={Logo}
            style={{
              filter: 'invert(1)',
            }}
          />
        </div>
        <div
          style={{
            'flex-grow': 1,
          }}
        />

        <div
          class="padding-4 gap-small footer-row"
          classList={{
            'gap-small': isSmall(),
            'gap-big': !isSmall(),
          }}
        >
          <div>
            <p class="heading8 footer-text">Menu</p>
            <nav id="arcane-application-navigation" class="align-vertical">
              <Show when={nav()}>
                {
                  <For each={nav().applicationCollection.items}>
                    {(n) => (
                      <div class="footer-text">
                        <a
                          class="third after footer-link body1 "
                          href={window.location.origin + '/' + (n.path ?? '')}
                        >
                          {n.name}
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
              <div class="footer-text">
                <a class="third after footer-link body1" href="/people">
                  People
                </a>
              </div>
              <div class="footer-text">
                <a class="third after footer-link body1" href="/relations">
                  Investor Relations
                </a>
              </div>
              <div class="footer-text">
                <a class="third after footer-link body1" href="/privacy">
                  Privacy
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <hr />

      <div
        class="container margin-12 padding-16 gap-small"
        classList={{
          'footer-row': !isSmall(),
          'footer-side': isSmall(),
        }}
      >
        <div
          class="gap-small"
          classList={{
            'footer-row': !isSmall(),
            'footer-side': isSmall(),
          }}
        >
          <p class="body3">© All rights reserved to Arcane.</p>
          <p class="body3">Made with ❤️ in Norway</p>
        </div>
        <div
          style={{
            'flex-grow': 1,
          }}
        />

        <div class="footer-follow gap-small">
          <p class="body3">Follow us</p>
          <a href="https://twitter.com/arcane_crypto" class="footer-link body3">
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
      </div> */}
    </footer>
  );
};

export default Footer;
