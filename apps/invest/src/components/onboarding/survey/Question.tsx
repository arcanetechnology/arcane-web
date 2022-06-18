/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from './Question.types';
import SolidRichText from 'rich-text-solid-renderer';
import { RadioButton, FieldSet } from '@arcane-web/alchemy';

type QuestionProps = {
  question: OnboardingNode;
};

const Question: VoidComponent<QuestionProps> = (props) => {
  return (
    <>
      <SolidRichText document={props.question.content} />
      <FieldSet class="padding-16">
        <RadioButton
          position="down"
          id={props.question.name}
          name={props.question.name}
          label="Yes"
          value="yes"
        />
        <br />
        <RadioButton
          position="down"
          id={props.question.name}
          name={props.question.name}
          label="No"
          value={'no'}
        />
      </FieldSet>
    </>
  );
};

export default Question;
