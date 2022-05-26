/** @format */

import { VoidComponent, For, Switch, Match } from 'solid-js';
import OnboardingQuestion from './OnboardingQuestion';
import { useOnboarding } from './Onboarding';

const OnboardingSurvey: VoidComponent = () => {
  const { questions, store } = useOnboarding();
  const [question] = store;

  return (
    <div>
      <Switch>
        <For each={questions}>
          {(node) => (
            <Match when={question() === node.name}>
              <OnboardingQuestion question={node} />
            </Match>
          )}
        </For>
      </Switch>
    </div>
  );
};

export default OnboardingSurvey;
