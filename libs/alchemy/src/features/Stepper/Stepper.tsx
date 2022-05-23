/** @format */

import {
  FlowComponent,
  FlowProps,
  splitProps,
  children,
  createUniqueId,
  JSXElement,
} from 'solid-js';
import { FormProps, Form } from '../../components';
import { StaticProps } from '../../types';

const StepperConstants = ['Tab', 'Actions'] as const;
type StepperKeys = typeof StepperConstants[number];

type TabProps = {
  id: string;
};

const Tab: FlowComponent<TabProps & FlowProps> = (props) => {
  return <div id={`${props.id}-tab`}>{props.children}</div>;
};

const Actions: FlowComponent<FlowProps> = (props) => {
  return <div>{props.children}</div>;
};

type StepperProps = {
  children: (id: string) => JSXElement;
} & FormProps;
const Stepper: FlowComponent<StepperProps> &
  StaticProps<StepperKeys, TabProps & FlowProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);
  const id = createUniqueId();
  const memo = children(() => local.children(id));
  return <Form {...others}>{memo()}</Form>;
};

Stepper.Tab = Tab;
Stepper.Actions = Actions;

export default Stepper;
