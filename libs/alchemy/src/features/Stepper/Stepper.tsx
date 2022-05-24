/** @format */

import {
  FlowComponent,
  FlowProps,
  splitProps,
  JSXElement,
  Show,
} from 'solid-js';
import { FormProps, Form, Button } from '../../components';
import { Next, Previous, useStepper } from '../../utilities';

type Actions = (next: Next, previous: Previous) => JSXElement;

interface StepperProps extends FormProps {
  actions?: Actions;
}
const Stepper: FlowComponent<StepperProps & FlowProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'actions']);
  const { next, previous, childElements } = useStepper(0);

  return (
    <Form {...others}>
      <div use:childElements>{local.children}</div>
      <Show
        when={props.actions !== undefined}
        fallback={
          <div>
            <Button onClick={previous} type="button">
              Back
            </Button>
            <Button onClick={next} type="button">
              Next
            </Button>
            <Button id={others.id} type="submit">
              Submit
            </Button>
            <Button id={others.id} type="reset">
              Reset
            </Button>
          </div>
        }
      >
        {local.actions!(next, previous)}
      </Show>
    </Form>
  );
};

export default Stepper;
