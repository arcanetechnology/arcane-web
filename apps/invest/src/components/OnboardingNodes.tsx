/** @format */

import { VoidComponent } from 'solid-js';
import { OnboardingNode } from '.';

type OnboardingNodesProps = {
  node: OnboardingNode;
};

const OnboardingNode: VoidComponent<OnboardingNodesProps> = (props) => {
  return (
    <div data-animation="fade-in" data-animation-delay="0.5s">
      {props.node.name}
    </div>
  );
};

export default OnboardingNode;
