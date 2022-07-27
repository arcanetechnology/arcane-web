/** @format */

import type { VoidComponent } from 'solid-js';
import { Private } from '~/components';
import { Banner } from '@arcane-web/alchemy-solid';

const Apps: VoidComponent = () => {
  const [t] = useI18n();
  return (
    <Private>
      <Banner>
        <h1>{t('apps.hero', {}, 'Apps list')}</h1>
      </Banner>
    </Private>
  );
};

export default Apps;
