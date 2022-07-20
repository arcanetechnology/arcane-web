/** @format */

import type { VoidComponent } from 'solid-js';
import { Banner, Public } from '~/components';

const Home: VoidComponent = () => {
  const [t] = useI18n();
  return (
    <Public>
      <Banner>
        <h1>{t('global.landing.title', {}, 'Welcome to Arcane Crypto')}</h1>
      </Banner>
    </Public>
  );
};

export default Home;
