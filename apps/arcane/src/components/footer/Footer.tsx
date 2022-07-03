/** @format */

import type { VoidComponent } from 'solid-js';
import './Footer.scss';

const Footer: VoidComponent = () => {
  return (
    <footer>
      <div class="margin-48 container align-row gap-big">
        <div>
          <h1>logo here</h1>
        </div>
        <div
          style={{
            'flex-grow': 1,
          }}
        ></div>

        <div>
          <h5>Navigation</h5>
          <nav id="arcane-application-navigation" class="align-vertical">
            <a class="third after footer-link" href="/trade">
              Trade
            </a>
            <a class="third after footer-link" href="/invest">
              Invest
            </a>
            <a class="third after footer-link" href="/research">
              Research
            </a>
          </nav>
        </div>
        <div>
          <h5>Company</h5>
          <nav id="arcane-static" class="align-vertical">
            <a class="third after footer-link" href="/people">
              People
            </a>
            <a class="third after footer-link" href="/relations">
              Investor Relations
            </a>
            <a class="third after footer-link" href="/privacy">
              Privacy
            </a>
          </nav>
        </div>
      </div>

      <hr />
      <div class="container align-row margin-12 gap-big">
        <p>© All rights reserved to Arcane.</p>
        <p>Made with ❤️ in Norway</p>
        <div
          style={{
            'flex-grow': 1,
          }}
        ></div>
        <div class="footer-follow gap-small">
          <p>Follow us</p>
          <a href="https://twitter.com/arcane_crypto" class="footer-link">
            <h1>twitter</h1>
          </a>
          <a
            href="https://www.linkedin.com/company/arcane-crypto/"
            class="footer-link"
          >
            <h1>linkedin</h1>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
