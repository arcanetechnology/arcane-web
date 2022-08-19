/** @format */

import type { VoidComponent } from 'solid-js';
import { Button } from '@arcane-web/alchemy-solid';
import Invest from '../assets/invest.svg';
import { Private } from '../components';

const Error: VoidComponent = () => {
  return (
    <Private>
      <section class="margin-48">
        <div id="apology-message" class="container" data-auto-grid="2">
          <div class="space-8">
            <img src={Invest} alt="invest-error" />
          </div>
          <div class="space-8 align-vertical">
            <p class="heading7">
              Due to current MIFID regulations we cannot show you information
              about the Arcane Assets fund at this time.
            </p>
            <p class="heading7">
              In the meantime, please feel free to browse our market leading
              digital assets research and analysis.
            </p>
            <div class="margin-top-16">
              <a href={window.location.origin + '/research'}>
                <Button size="large" variant="primary" id="error">
                  Go To Research
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Private>
  );
};

export default Error;
