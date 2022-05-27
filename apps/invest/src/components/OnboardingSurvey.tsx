/** @format */

import { VoidComponent, For, Switch, Match } from 'solid-js';
import OnboardingQuestion from './OnboardingQuestion';
import { useOnboarding } from './Onboarding';

const OnboardingSurvey: VoidComponent = () => {
  const [form] = useOnboarding();

  return (
    <Switch>
      <For each={form.questions}>
        {(node) => (
          <Match when={form.currAnswer === node.name}>
            <OnboardingQuestion question={node} />
          </Match>
        )}
      </For>
    </Switch>
  );
};

export default OnboardingSurvey;
