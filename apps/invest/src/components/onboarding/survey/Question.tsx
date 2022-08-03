/** @format */

import { VoidComponent } from 'solid-js';
import { BLOCKS } from '@contentful/rich-text-types';
import { OnboardingNode } from './Question.types';
import SolidRichText from 'rich-text-solid-renderer';
import { RadioButton, FieldSet, Button } from '@arcane-web/alchemy-solid';
import aLetter from '../../../assets/aletter.svg';
import bLetter from '../../../assets/bletter.svg';

type QuestionProps = {
  question: OnboardingNode;
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (props) => {
      return <p class="body3">{props.children}</p>;
    },
    [BLOCKS.HEADING_1]: (props) => {
      return <p class="heading8">{props.children}</p>;
    },
  },
};

const Question: VoidComponent<QuestionProps> = (props) => {
  return (
    <div>
      <SolidRichText document={props.question.content.json} options={options} />
      {props.question.name === 'warning' ? null : (
        <FieldSet class="padding-16">
          <div class="align-vertical gap-default">
            <Button type="button" variant="secondary" size="medium">
              <img src={aLetter} />
              <span>Yes</span>
            </Button>
            <Button type="button" variant="secondary" size="medium">
              <img src={bLetter} />
              <span>No</span>
            </Button>
          </div>
        </FieldSet>
      )}
    </div>
  );
};

export default Question;
