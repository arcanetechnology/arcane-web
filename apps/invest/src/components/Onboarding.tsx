/** @format */

import { VoidComponent, For, Switch, createSignal, Match } from 'solid-js';
import { OnboardingNodes } from '.';
import OnboardingNode from './OnboardingNodes';
import { Button } from '@arcane-web/alchemy';
import ArcaneFlow from '@arcane-web/arcane-flow';
import onboardingConfig, { Questions } from '../config/onboarding';

type OnboardingProps = {
  nodes: OnboardingNodes;
};

const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const { curr, next, previous } = ArcaneFlow(onboardingConfig, 'intro');
  const [question, setQuestion] = createSignal<Questions>(curr);
  return (
    <div>
      <Switch fallback={'...loading onboarding questions'}>
        <For each={props.nodes}>
          {(node) => (
            <Match when={question() === node.name}>
              <OnboardingNode node={node} />
            </Match>
          )}
        </For>
      </Switch>
      <div>
        <Button
          onClick={() => {
            setQuestion(previous());
          }}
        >
          <span>Cancel</span>
        </Button>
        <Button
          onClick={() => {
            setQuestion(next('yes'));
          }}
        >
          <span>Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
