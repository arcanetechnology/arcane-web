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
      <div>
        <SolidRichText document={props.question.content} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '150px',
          'z-index': 2,
          'margin-top': 10,
        }}
      >
        <FieldSet>
          <RadioButton
            position="down"
            id="dynamic-onboarding-radio"
            name="dynamic-onboarding"
            label="yes"
            value="yes"
          />
          <br />
          <RadioButton
            position="down"
            id="dynamic-onboarding-radio"
            name="dynamic-onboarding"
            label="no"
            value={'no'}
          />
        </FieldSet>
      </div>
    </>
  );
};

export default OnboardingQuestion;
