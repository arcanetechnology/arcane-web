/** @format */

import { createContext, useContext, VoidComponent, lazy } from 'solid-js';
import { Countries, OnboardingNodes } from '../types';
import OnboardingForm from './OnboardingForm';
import OnboardingSurvey from './OnboardingSurvey';

type OnboardingConextValue = {
  questions: OnboardingNodes;
  countries: Countries;
};

const OnboardingContext = createContext<OnboardingConextValue>({
  questions: [],
  countries: [],
});

type OnboardingProps = OnboardingConextValue;
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  return (
    <OnboardingContext.Provider
      value={{ questions: props.questions, countries: props.countries }}
    >
      {/* <OnboardingSurvey /> */}
      <OnboardingForm />
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
