/** @format */

import {
  FlowComponent,
  FlowProps,
  splitProps,
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import { FormProps, Form } from '../../components';
import { StaticProps } from '../../types';

const StepperConstants = ['Tab', 'Actions'] as const;
type StepperKeys = typeof StepperConstants[number];

type StepperContextProps = {
  id: string;
};

const StepperContext = createContext<StepperContextProps>();

type StepperProps = FormProps;
const Stepper: FlowComponent<StepperProps> &
  StaticProps<StepperKeys, FlowProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);
  const id = createUniqueId();
  return (
    <StepperContext.Provider value={{ id }}>
      <Form {...others}>{local.children}</Form>
    </StepperContext.Provider>
  );
};

const Tab: FlowComponent = (props) => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('cannot use stepper tab outside of stepper!!');
  }
  return <div id={`stepper-${context.id}-tab`}>{props.children}</div>;
};

const Actions: FlowComponent<FlowProps> = (props) => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('cannot use actions tab outside of stepper!!');
  }
  return <div id={`stapper-${context.id}-actions`}>{props.children}</div>;
};

Stepper.Tab = Tab;
Stepper.Actions = Actions;

export default Stepper;
