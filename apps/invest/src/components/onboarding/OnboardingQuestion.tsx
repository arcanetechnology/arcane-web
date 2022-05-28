/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '../../types';
import SolidRichText from 'rich-text-solid-renderer';
import { RadioButton, FieldSet } from '@arcane-web/alchemy';

type OnboardingQuestionProps = {
  question: OnboardingNode;
};

const OnboardingQuestion: VoidComponent<OnboardingQuestionProps> = (props) => {
  return (
    <>
      <SolidRichText document={props.question.content} />
      <FieldSet class="padding-16">
        <RadioButton
          position="down"
          id={props.question.name}
          name="dynamic-onboarding"
          label="Yes"
          value="yes"
        />
        <br />
        <RadioButton
          position="down"
          id={props.question.name}
          name="dynamic-onboarding"
          label="No"
          value={'no'}
        />
      </FieldSet>
    </>
  );
};

export default OnboardingQuestion;
