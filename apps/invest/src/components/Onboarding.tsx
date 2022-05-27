/** @format */

import { createContext, useContext, VoidComponent, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { OnboardingNodes } from '../types';
import OnboardingForm from './OnboardingForm';
import ArcaneFlow from '@arcane-web/arcane-flow';
import onboardingConfig, { Questions, Answers } from '../config/onboarding';

type OnboardingStore = [
  {
    questions: OnboardingNodes;
    route: Questions;
    currAnswer: Questions;
    disable: boolean;
  },
  {
    setRouting: (answer: Answers) => void;
    setAnswer: (question: Questions) => void;
  }
];

const OnboardingContext = createContext<OnboardingStore>();

type OnboardingProps = {
  questions: OnboardingNodes;
};
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const { curr, next } = ArcaneFlow<Questions, Answers>(
    onboardingConfig,
    'intro'
  );

  const [form, setForm] = createStore({
    questions: [],
    route: curr,
    currAnswer: curr,
    disable: true,
  });

  const store: OnboardingStore = [
    form,
    {
      setRouting(answer: Answers) {
        setForm({ route: next(answer), disable: false });
      },

      setAnswer(question: Questions) {
        setForm({ currAnswer: question, disable: true });
      },
    },
  ];

  onMount(() => {
    setForm({ questions: props.questions });
  });

  return (
    <OnboardingContext.Provider value={store}>
      <OnboardingForm />
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
