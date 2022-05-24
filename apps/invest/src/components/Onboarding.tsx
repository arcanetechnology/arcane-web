/** @format */

import {
  createContext,
  useContext,
  VoidComponent,
  createSignal,
} from 'solid-js';
import type { Accessor } from 'solid-js';
import { OnboardingNodes } from '../types';
import OnboardingForm from './OnboardingForm';
import ArcaneFlow from '@arcane-web/arcane-flow';
import onboardingConfig, { Questions, Answers } from '../config/onboarding';

type OnboardingStore = [
  Accessor<Questions>,
  { setAnswer: (answer: Answers) => void }
];

type OnboardingConextValue = {
  questions: OnboardingNodes;
  store: OnboardingStore;
};

const OnboardingContext = createContext<OnboardingConextValue>({
  questions: [],
  store: [] as unknown as OnboardingStore,
});

type OnboardingProps = OnboardingConextValue;
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const { curr, next } = ArcaneFlow<Questions, Answers>(
    onboardingConfig,
    'intro'
  );

  const [question, setQuestion] = createSignal<Questions>(curr),
    store: OnboardingStore = [
      question,
      {
        setAnswer(answer: Answers) {
          setQuestion(next(answer));
        },
      },
    ];

  return (
    <OnboardingContext.Provider value={{ questions: props.questions, store }}>
      <OnboardingForm />
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
