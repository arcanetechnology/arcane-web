/** @format */

import { FlowComponent, FlowProps, splitProps, children } from 'solid-js';
import { FormProps, Form } from '../../components';
import { StaticProps } from '../../types';

const StepperConstants = ['Tab', 'Actions'] as const;
type StepperKeys = typeof StepperConstants[number];

const Tab: FlowComponent<FlowProps> = (props) => {
  return <div>{props.children}</div>;
};

const Actions: FlowComponent<FlowProps> = (props) => {
  return <div>{props.children}</div>;
};

type StepperProps = FormProps;
const Stepper: FlowComponent<StepperProps & FlowProps> &
  StaticProps<StepperKeys, FlowProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);
  const memo = children(() => local.children);
  return <Form {...others}>{memo()}</Form>;
};

Stepper.Tab = Tab;
Stepper.Actions = Actions;

export default Stepper;
