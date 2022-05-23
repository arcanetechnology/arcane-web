/** @format */

import { FlowComponent, FlowProps } from 'solid-js';
import { StaticProps } from '../../types';

const StepperConstants = ['Tab', 'Actions'] as const;
type StepperKeys = typeof StepperConstants[number];

const Tab: FlowComponent<FlowProps> = (props) => {
  return <div>{props.children}</div>;
};

const Actions: FlowComponent<FlowProps> = (props) => {
  return <div>{props.children}</div>;
};

const StepperForm: FlowComponent<FlowProps> &
  StaticProps<StepperKeys, FlowProps> = (props) => {
  return <div>hello</div>;
};

StepperForm.Tab = Tab;
StepperForm.Actions = Actions;

export default StepperForm;
