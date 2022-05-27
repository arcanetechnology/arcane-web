/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '../types';
import SolidRichText from 'rich-text-solid-renderer';
import { RadioButton, FieldSet } from '@arcane-web/alchemy';

type OnboardingQuestionProps = {
  question: OnboardingNode;
};

const OnboardingQuestion: VoidComponent<OnboardingQuestionProps> = (props) => {
  return (
    <>
      <div style={{ overflow: 'scroll' }}>
        <SolidRichText document={props.question.content} />
      </div>
      <div>
        <FieldSet>
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
      </div>
    </>
  );
};

export default OnboardingQuestion;
