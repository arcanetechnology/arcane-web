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
      <div class="container footer-row margin-48 padding-24">
        <div class="padding-8">
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
      </div>

      <hr />

      <div class="container footer-row margin-12 padding-24">
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
