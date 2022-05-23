/** @format */

import { Stepper } from '.';
import { cleanup, render } from 'solid-testing-library';

describe('alchemy stepper element', () => {
  afterEach(cleanup);
  it('should be able to render form element and functional children', () => {
    const tree = render(() => (
      <Stepper>
        <Stepper.Tab>
          <h1>Hello</h1>
        </Stepper.Tab>
        <Stepper.Tab>
          <h1>world</h1>
        </Stepper.Tab>
      </Stepper>
    )).baseElement;

    expect(tree).toMatchSnapshot();
  });
});
