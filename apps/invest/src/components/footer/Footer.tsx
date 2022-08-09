/** @format */

import { For, Show, VoidComponent } from 'solid-js';
import Twitter from '../../assets/twitter.svg';
import LinkedIn from '../../assets/linkedin.svg';
import './Footer.scss';
import Logo from '../../assets/logo.svg';
import { getNavigation } from '../../api/navigation';
import { isSmall } from '..';

const Footer: VoidComponent = () => {
  const nav = getNavigation();
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
                <Show when={nav()}>
                  {
                    <For each={nav().applicationCollection.items}>
                      {(n) => (
                        <div style={{ 'margin-top': '16px', color: 'white' }}>
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
            <div style={{ 'margin-right': '96px' }}>
              <p class="heading8 footer-text">Company</p>
              <nav id="arcane-static" class="align-vertical">
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after footer-link body1" href="/people">
                    People
                  </a>
                </div>
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after footer-link body1" href="/relations">
                    Investor Relations
                  </a>
                </div>
                <div style={{ 'margin-top': '16px' }}>
                  <a class="third after footer-link body1" href="/privacy">
                    Privacy
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
          <div>Made with in Norway</div>
          <div class="social">
            <p
              class="body3"
              style={{
                'margin-right': '16px',
              }}
            >
              Follow us
            </p>
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
