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
            <Invest />
          </div>
          <div class="space-8 align-vertical">
            <h4 class="secondary-text">
              We unfortunalety can not offer you a spot in our fund right now.
            </h4>
            <h4 class="secondary-text">
              Feel free to contact us if you have any question.
            </h4>
            <h4 class="secondary-text">
              In the meatime, check our Research Platform.
            </h4>
            <div class="margin-top-16">
              <Button type="button" variant="primary">
                Go To Research
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Private>
  );
};

export default Error;
