/** @format */

import { ParentComponent } from 'solid-js';
import { Button } from '../../components';

const StepperConstants = ['Tab'] as const;
type StepperKeys = typeof StepperConstants[number];
type StepperStaticProps = { [key in StepperKeys]: ParentComponent };

type StepperFormProps = {
  children: Array<Element>;
};

const StepperForm: ParentComponent<StepperFormProps> & StepperStaticProps = (
  props
) => {
  return (
    <div>
      {props.children}
      <Button>Next</Button>
      <Button>Previous</Button>
    </div>
  );
};

const StepperTab: ParentComponent = (props) => {
  return (
    <div class="stepper-tab" id="stepper-tab">
      {props.children}
    </div>
  );
};

StepperForm.Tab = StepperTab;

export default StepperForm;
