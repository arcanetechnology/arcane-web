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
      return (
        <>
          <br />
          <p class="small">{props.children}</p>
        </>
      );
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
    <SolidRichText document={props.question.content.json} options={options} />
  );
};

export default Question;
