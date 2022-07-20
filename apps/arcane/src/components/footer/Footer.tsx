/** @format */

import type { VoidComponent } from 'solid-js';
import { FaBrandsLinkedinIn, FaBrandsTwitter } from 'solid-icons/fa';
import logo from '~/assets/logo.svg';

import './Footer.scss';

const Footer: VoidComponent = () => {
  const [t] = useI18n();

  return (
    <footer>
      <div class="container footer-row margin-48">
        <div>
          <img
            style={{
              filter: `invert(1)`,
            }}
            src={logo}
            alt="arcane-logo"
          />
        </div>
        <div
          style={{
            'flex-grow': 1,
          }}
        />
        <div>
          <p class="heading8">
            {t('global.footer.navigation.title', {}, 'Navigation')}
          </p>
          <nav id="arcane-application-navigation" class="align-vertical">
            <p>navigation placeholder</p>
          </nav>
        </div>
        <div>
          <p class="heading8">
            {t('global.footer.company.title', {}, 'Company')}
          </p>
          <nav id="arcane-static" class="align-vertical">
            <Link href="/people" class="third after footer-link body1">
              {t('global.footer.company.privacy', {}, 'Privacy Policy')}
            </Link>
            <Link href="/relations" class="third after footer-link body1">
              {t('global.footer.company.relations', {}, 'Investor Relations')}
            </Link>
            <Link href="/privacy" class="third after footer-link body1">
              {t('global.footer.company.privacy', {}, 'Privacy Policy')}
            </Link>
          </nav>
        </div>
      </div>

      <hr />
      <div class="container footer-row margin-12">
        <p class="body3">
          {t(
            'global.footer.copyright',
            { date: '2022' },
            '© All rights reserved to Arcane.'
          )}
        </p>
        <p class="body3">
          {t('global.footer.message', {}, 'Made with ❤️ in Norway')}
        </p>
        <div
          style={{
            'flex-grow': 1,
          }}
        />
        <div class="footer-follow gap-small">
          <p class="body3">
            {t('global.footer.social.title', {}, 'Follow Us')}
          </p>
          <Link href={'https://twitter.com/arcane_crypto'}>
            <p class="body3 footer-link">
              <FaBrandsTwitter />
            </p>
          </Link>
          <Link href={'https://www.linkedin.com/company/arcane-crypto/'}>
            <p class="body3 footer-link">
              <FaBrandsLinkedinIn />
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
