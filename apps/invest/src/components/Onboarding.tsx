/** @format */

import { VoidComponent, For, Switch, createSignal, Match } from 'solid-js';
import { OnboardingNodes } from '.';
import OnboardingNode from './OnboardingNodes';
import { Button } from '@arcane-web/alchemy';
import Flow, { Questions } from '../config';

type OnboardingProps = {
  nodes: OnboardingNodes;
};

const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [question, setQuestion] = createSignal<Questions>(Flow.data);
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
        <Button>Cancel</Button>
        <Button
          onClick={() => {
            setQuestion(Flow.next('yes'));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
