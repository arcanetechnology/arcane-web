/** @format */
import type { VoidComponent } from 'solid-js';
import { Button } from '@arcane-web/alchemy-solid';
import { OnboardingFormPages } from './Onboarding.types';
import OnboardingLogo from '../../assets/onboarding.svg';
import './OnboardingWelcomePage.scss';

const OnboardingWelcomePage: VoidComponent<OnboardingFormPages> = (props) => {
  return (
    <div class="onboarding-welcome">
      <div class="onboarding-welcome-title">
        <img src={OnboardingLogo} alt="onboarding logo" />
        <p class="heading8">Investment Onboarding</p>
      </div>
      <div class="onboarding-welcome-content">
        <p class="heading8">
          Thanks for your insterest in our fund. Before we proceed, we will ask
          you some questions that will help customize this solution to meet your
          own needs.
        </p>
      </div>
      <div class="onboarding-welcome-action">
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
  );
};

export default OnboardingWelcomePage;
