/** @format */

import { createEffect, VoidComponent } from 'solid-js';
import { BLOCKS } from '@contentful/rich-text-types';
import { OnboardingNode } from './Question.types';
import SolidRichText from 'rich-text-solid-renderer';
import { FieldSet, Button } from '@arcane-web/alchemy-solid';
import './Questions.scss';
import aLetter from '../../../assets/aletter.svg';
import bLetter from '../../../assets/bletter.svg';
import { createShortcut } from '@solid-primitives/keyboard';

type QuestionProps = {
  question: OnboardingNode;
  onChange: (value: any) => void;
  onSubmit: (values: any) => void;
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
  /* createEffect(() => {
    createShortcut(
      ['Alt', 'A'],
      () => {
        props.onSubmit({ [props.question.name]: 'yes' });
      },
      { preventDefault: true, requireReset: true }
    );
  }); */

  return (
    <div
      class="survey-node"
      classList={{
        'warning-survey-node': props.question.name === 'warning',
      }}
    >
      <SolidRichText document={props.question.content.json} options={options} />
      {props.question.name === 'warning' ? (
        <div class="padding-16">
          <Button
            onClick={() => props.onSubmit({ [props.question.name]: 'yes' })}
            type="button"
            variant="secondary"
            size="medium"
          >
            {/* <img src={aLetter} /> */}
            <span>I Agree with terms and conditions</span>
          </Button>
        </div>
      ) : (
        <FieldSet class="padding-16">
          <div class="align-vertical gap-default">
            <Button
              onClick={() => props.onSubmit({ [props.question.name]: 'yes' })}
              type="button"
              variant="secondary"
              size="medium"
            >
              {/* <img src={aLetter} /> */}
              <span>Yes</span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              onClick={() => props.onSubmit({ [props.question.name]: 'no' })}
            >
              {/* <img src={bLetter} /> */}
              <span>No</span>
            </Button>
          </div>
        </FieldSet>
      )}
    </div>
  );
};

export default Question;
