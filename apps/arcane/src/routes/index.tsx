/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';
import { Banner } from '@arcane-web/alchemy-solid';

const Home: VoidComponent = () => {
  const [t] = useI18n();
  return (
    <Public>
      <Banner>
        <h1>{t('landing.hero', {}, 'Welcome to Arcane Crypto')}</h1>
      </Banner>
    </Public>
  );
};

export default Home;
