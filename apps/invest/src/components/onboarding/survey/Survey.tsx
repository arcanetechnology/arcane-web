/** @format */

import { VoidComponent, For, Switch, Match } from 'solid-js';
import Question from './Question';
import { useOnboarding } from '../Onboarding';
import { Form, Button } from '@arcane-web/alchemy';
import type { OnboardingFormPages } from '../Onboarding.types';
import { createForm } from '@felte/solid';
import { Questions } from '../config';

type OnboardingSurveyProps = {
  route: Questions;
};

const OnboardingSurvey: VoidComponent<
  OnboardingFormPages & OnboardingSurveyProps
> = (props) => {
  const questions = useOnboarding();
  const { form, data } = createForm({
    onSubmit: props.onSubmit,
  });
  return (
    <Form
      ref={form}
      style={{
        display: 'grid',
        'grid-template-rows': '90% 10%',
        height: '100%',
        overflow: 'scroll',
      }}
    >
      <div>
        <Switch>
          <For each={questions}>
            {(node) => {
              return (
                <Match when={props.route === node.name}>
                  <Question question={node} />
                </Match>
              );
            }}
          </For>
        </Switch>
      </div>
      <div class="align-row w-full">
        <Button type="button" onClick={() => props.onBack(data)}>
          Back
        </Button>
        <div style="flex-grow: 1;"></div>
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default OnboardingSurvey;
