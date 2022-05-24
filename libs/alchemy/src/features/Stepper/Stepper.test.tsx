/** @format */

import { Stepper, StepperTab } from '.';
import { cleanup, render } from 'solid-testing-library';

describe('alchemy stepper element', () => {
  afterEach(cleanup);
  it('should be able to render form element and functional children', () => {
    const tree = render(() => (
      <Stepper>
        <StepperTab>
          <h1>Hello</h1>
        </StepperTab>
        <StepperTab>
          <h1>world</h1>
        </StepperTab>
      </Stepper>
    )).baseElement;

    expect(tree).toMatchSnapshot();
  });
});
