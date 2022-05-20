/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '.';
import SolidRichText from 'rich-text-solid-renderer';
import type { Answers } from '../config/onboarding';
import { RadioButton, FieldSet } from '@arcane-web/alchemy';

type OnboardingNodesProps = {
  node: OnboardingNode;
  onAnswer: (answer: Answers) => void;
};

const OnboardingNode: VoidComponent<OnboardingNodesProps> = (props) => {
  return (
    <>
      <SolidRichText document={props.node.content} />
      <FieldSet>
        <RadioButton
          position="down"
          id="test-radio"
          name="test-checkbox"
          label="yes"
          value="yes"
          onChange={(e) => props.onAnswer(e.currentTarget.value as Answers)}
        />
        <RadioButton
          position="down"
          id="test-2"
          name="test-checkbox"
          label="no"
          value={'no'}
          onChange={(e) => props.onAnswer(e.currentTarget.value as Answers)}
        />
      </FieldSet>
    </>
  );
};

export default OnboardingNode;
