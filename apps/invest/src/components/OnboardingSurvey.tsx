/** @format */

import { VoidComponent, For, Switch, createSignal, Match } from 'solid-js';
import OnboardingQuestion from './OnboardingQuestion';
import ArcaneFlow from '@arcane-web/arcane-flow';
import onboardingConfig, { Questions, Answers } from '../config/onboarding';
import { useOnboarding } from './Onboarding';

const OnboardingSurvey: VoidComponent = () => {
  const { questions } = useOnboarding();
  const { curr, next } = ArcaneFlow<Questions, Answers>(
    onboardingConfig,
    'intro'
  );
  const [question, setQuestion] = createSignal<Questions>(curr);

  const onAnswer = (answer: Answers) => {
    setQuestion(next(answer));
  };
  return (
    <div>
      <Switch>
        <For each={questions}>
          {(node) => (
            <Match when={question() === node.name}>
              <OnboardingQuestion question={node} onAnswer={onAnswer} />
            </Match>
          )}
        </For>
      </Switch>
    </div>
  );
};

export default OnboardingSurvey;
