/** @format */

import { For, Show, VoidComponent } from 'solid-js';
import Twitter from '../../assets/twitter.svg';
import LinkedIn from '../../assets/linkedin.svg';
import './Footer.scss';
import Logo from '../../assets/logo.svg';
import { getNavigation } from '../../api/navigation';

const Footer: VoidComponent = () => {
  const nav = getNavigation();
  return (
    <footer>
      <div class="container footer-row margin-48">
        <div>
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

        <div>
          <p class="heading8">Navigation</p>
          <nav id="arcane-application-navigation" class="align-vertical">
            <Show when={nav()}>
              {
                <For each={nav().applicationCollection.items}>
                  {(n) => (
                    <a
                      class="third after footer-link body1"
                      href={window.location.origin + '/' + (n.path ?? '')}
                    >
                      {n.name}
                    </a>
                  )}
                </For>
              }
            </Show>
          </nav>
        </div>
        <div>
          <p class="heading8">Company</p>
          <nav id="arcane-static" class="align-vertical">
            <a class="third after footer-link body1" href="/people">
              People
            </a>
            <a class="third after footer-link body1" href="/relations">
              Investor Relations
            </a>
            <a class="third after footer-link body1" href="/privacy">
              Privacy
            </a>
          </nav>
        </div>
      </div>

      <hr />

      <div class="container footer-row margin-12">
        <p class="body3">© All rights reserved to Arcane.</p>
        <p class="body3">Made with ❤️ in Norway</p>
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
      </div>
    </footer>
  );
};

export default Footer;
