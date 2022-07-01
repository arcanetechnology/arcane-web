/** @format */

import type { FirebaseOptions } from 'firebase/app';
import { VoidComponent } from 'solid-js';
import type { OnboardingNodes } from '../types';
import { ArcaneAuthProvider } from '../components/auth';
import { Onboarding } from './onboarding';

type AuthOnboardingProps = {
  questions: OnboardingNodes;
};

const AuthOnboarding: VoidComponent<AuthOnboardingProps> = (props) => {
  return (
    <ArcaneAuthProvider>
      <Onboarding questions={props.questions} />
    </ArcaneAuthProvider>
  );
};

export default AuthOnboarding;
