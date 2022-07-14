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
            <p class="heading7">
              We unfortunalety can not offer you a spot in our fund right now.
            </p>
            <p class="heading7">
              Feel free to contact us if you have any question.
            </p>
            <p class="heading7">In the meatime, check our Research Platform.</p>
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
