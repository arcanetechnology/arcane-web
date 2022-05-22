/** @format */

import { createContext, useContext, VoidComponent } from 'solid-js';
import { OnboardingNodes } from '../types';
import OnboardingForm from './OnboardingForm';
import OnboardingSurvey from './OnboardingSurvey';

type OnboardingConextValue = {
  questions: OnboardingNodes;
};

const OnboardingContext = createContext<OnboardingConextValue>({
  questions: [],
});

type OnboardingProps = OnboardingConextValue;
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  return (
    <OnboardingContext.Provider value={{ questions: props.questions }}>
      {/* <OnboardingSurvey /> */}
      <OnboardingForm />
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
