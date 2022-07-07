/** @format */

import { VoidComponent } from 'solid-js';
import { BLOCKS } from '@contentful/rich-text-types';
import { OnboardingNode } from './Question.types';
import SolidRichText from 'rich-text-solid-renderer';
import { RadioButton, FieldSet } from '@arcane-web/alchemy-solid';

type QuestionProps = {
  question: OnboardingNode;
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (props) => {
      return <p class="heading8">{props.children}</p>;
    },
  },
};

const Question: VoidComponent<QuestionProps> = (props) => {
  return (
    <div
      style={{
        overflow: props.question.name === 'warning' ? 'scroll' : 'hidden',
      }}
    >
      <SolidRichText document={props.question.content.json} options={options} />
      {props.question.name === 'warning' ? null : (
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
            id={props.question.name + 'no'}
            name={props.question.name}
            label="No"
            value={'no'}
          />
        </FieldSet>
      )}
    </div>
  );
};

export default Question;
