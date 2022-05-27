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
    disable: boolean;
  },
  {
    setRoute: () => void;
    setAnswer: (answer: Answers) => void;
  }
];

const OnboardingContext = createContext<OnboardingStore>();

type OnboardingProps = {
  questions: OnboardingNodes;
};
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const { getCurrent, next } = ArcaneFlow<Questions, Answers>(
    onboardingConfig,
    'intro'
  );

  const [form, setForm] = createStore({
    questions: [],
    route: getCurrent(),
    disable: true,
  });

  const store: OnboardingStore = [
    form,
    {
      setRoute() {
        setForm({ route: getCurrent(), disable: true });
      },

      setAnswer(answers: Answers) {
        next(answers);
        setForm({ disable: false });
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
