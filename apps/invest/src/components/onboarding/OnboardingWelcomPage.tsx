/** @format */
import type { VoidComponent } from 'solid-js';
import { Button } from '@arcane-web/alchemy-solid';
import { OnboardingFormPages } from './Onboarding.types';

const OnboardingWelcomePage: VoidComponent<OnboardingFormPages> = (props) => {
  return (
    <div class="onboarding-content">
      <div class="onboarding-main padding-32">
        <p class="heading8">
          Thanks for your insterest in our fund. Before we proceed, we will ask
          you some questions that will help customize this solution to meet your
          own needs.
        </p>
        <div class="w-full padding-24">
          <Button
            style={{
              'padding-top': '16px',
              'padding-bottom': '16px',
            }}
            class="w-full"
            size="medium"
            type="button"
            variant="primary"
            onClick={() => props.onSubmit({})}
          >
            Start
          </Button>
        </div>
      </div>
      <div class="w-full onboarding-footer">
        <br />
      </div>
    </div>
  );
};

export default OnboardingWelcomePage;
