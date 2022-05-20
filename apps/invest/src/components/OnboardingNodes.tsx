/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '.';
import SolidRichText from 'rich-text-solid-renderer';

type OnboardingNodesProps = {
  node: OnboardingNode;
};

const OnboardingNode: VoidComponent<OnboardingNodesProps> = (props) => {
  return (
    <div data-animation="fade-in" data-animation-delay="0.5s">
      <SolidRichText document={props.node.content} />
    </div>
  );
};

export default OnboardingNode;
