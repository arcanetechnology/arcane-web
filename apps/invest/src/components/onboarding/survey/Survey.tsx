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
    <Form ref={form}>
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
      <Button type="button" onClick={() => props.onBack(data)}>
        Back
      </Button>
      <Button type="submit" variant="primary">
        Next
      </Button>
    </Form>
  );
};

export default OnboardingSurvey;
