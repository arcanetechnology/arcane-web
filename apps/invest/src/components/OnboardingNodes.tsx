/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '.';
import SolidRichText from 'rich-text-solid-renderer';
import type { Answers } from '../config/onboarding';

type OnboardingNodesProps = {
  node: OnboardingNode;
  onAnswer: (answer: Answers) => void;
};

const OnboardingNode: VoidComponent<OnboardingNodesProps> = (props) => {
  return (
    <>
      <SolidRichText document={props.node.content} />
      <div class="padding-8"></div>
    </>
  );
};

export default OnboardingNode;
