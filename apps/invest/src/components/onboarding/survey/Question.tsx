/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from './Question.types';
import SolidRichText from 'rich-text-solid-renderer';
import { RadioButton, FieldSet } from '@arcane-web/alchemy-solid';

type QuestionProps = {
  question: OnboardingNode;
};

const Question: VoidComponent<QuestionProps> = (props) => {
  return (
    <div
      style={{
        overflow: 'scroll',
        height: props.question.name === 'warning' ? '400px' : '100%',
      }}
    >
      <SolidRichText document={props.question.content.json} />
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
    </div>
  );
};

export default Question;
