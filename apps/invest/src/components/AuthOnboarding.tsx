/** @format */

import type { FirebaseOptions } from 'firebase/app';
import { VoidComponent } from 'solid-js';
import type { OnboardingNodes } from '../types';
import { ArcaneAuthProvider } from '@arcane-web/arcane-auth';
import { Onboarding } from './onboarding';

type AuthOnboardingProps = {
  config: FirebaseOptions;
  questions: OnboardingNodes;
};

const AuthOnboarding: VoidComponent<AuthOnboardingProps> = (props) => {
  return (
    <ArcaneAuthProvider config={props.config} name="onboarding">
      <Onboarding questions={props.questions} />
    </ArcaneAuthProvider>
  );
};

export default AuthOnboarding;
