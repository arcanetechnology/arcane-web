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
      <div
        style={{
          'overflow-y': 'scroll',
          height: '250px',
        }}
      >
        <SolidRichText document={props.question.content} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '110px',
          'z-index': 2,
        }}
      >
        <FieldSet>
          <RadioButton
            position="down"
            id={props.question.name}
            name="dynamic-onboarding"
            label="yes"
            value="yes"
          />
          <br />
          <RadioButton
            position="down"
            id={props.question.name}
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
