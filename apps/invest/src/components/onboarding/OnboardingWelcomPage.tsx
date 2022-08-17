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
        <p class="heading8">Welcome to Arcane Invest</p>
      </div>
      <div class="onboarding-welcome-content">
        <p class="heading8">
          Please take a moment to answer some questions that will help us
          determine your eligibility to invest in our investment products.
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
