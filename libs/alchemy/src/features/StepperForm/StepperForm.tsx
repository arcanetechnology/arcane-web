/** @format */

import { children, createEffect, JSXElement, ParentComponent } from 'solid-js';
import { Form, Button } from '../../components';

const StepperConstants = ['Tab', 'Action'] as const;
type StepperKeys = typeof StepperConstants[number];
type StepperStaticProps = { [key in StepperKeys]: ParentComponent };

type StepperFormProps = {
  children: JSXElement;
};

const StepperForm: ParentComponent<StepperFormProps> & StepperStaticProps = (
  props
) => {
  const memo = children(() => props.children);

  return <Form id="stepperForm">{props.children}</Form>;
};

const StepperTab: ParentComponent = (props) => {
  return <div class="stepper-tab">{props.children}</div>;
};

const StepperAction: ParentComponent = (props) => {
  return (
    <div class="space-component">
      <Button>Previous</Button>
      <Button>Next</Button>
    </div>
  );
};

StepperForm.Tab = StepperTab;
StepperForm.Action = StepperAction;

export default StepperForm;
