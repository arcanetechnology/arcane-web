/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '.';
import SolidRichText from 'rich-text-solid-renderer';
import type { Answers } from '../config/onboarding';
import { Input, FieldSet } from '@arcane-web/alchemy';

type OnboardingNodesProps = {
  node: OnboardingNode;
  onAnswer: (answer: Answers) => void;
};

const OnboardingNode: VoidComponent<OnboardingNodesProps> = (props) => {
  return (
    <>
      <SolidRichText document={props.node.content} />
      <div class="padding-8">
        <FieldSet>
          <Input type={'radio'} name="test-checkbox" label="yes" />
          <Input type={'radio'} name="test-checkbox" label="no" />
        </FieldSet>
      </div>
    </>
  );
};

export default OnboardingNode;
