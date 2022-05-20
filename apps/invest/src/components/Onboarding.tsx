/** @format */

import { VoidComponent, For, Switch, createSignal, Match } from 'solid-js';
import { OnboardingNodes } from '.';
import OnboardingNode from './OnboardingNodes';
import ArcaneFlow from '@arcane-web/arcane-flow';
import onboardingConfig, { Questions, Answers } from '../config/onboarding';

type OnboardingProps = {
  nodes: OnboardingNodes;
};

const Onboarding: VoidComponent<OnboardingProps> = (props) => {
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
      <Switch fallback={'...loading onboarding questions'}>
        <For each={props.nodes}>
          {(node) => (
            <Match when={question() === node.name}>
              <OnboardingNode node={node} onAnswer={onAnswer} />
            </Match>
          )}
        </For>
      </Switch>
    </div>
  );
};

export default Onboarding;
