/** @format */

import type { VoidComponent } from 'solid-js';
import { Banner } from '@arcane-web/alchemy-solid';

const NotFound: VoidComponent = () => {
  const [t] = useI18n();
  return (
    <Banner>
      <h6 id="arcane-not-found">
        {t('global.404', {}, 'could not find the info')}
      </h6>
    </Banner>
  );
};

export default NotFound;
