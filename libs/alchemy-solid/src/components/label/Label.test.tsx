/** @format */

import { Label } from './Label';
import { cleanup, render } from 'solid-testing-library';

describe('alchemy label', () => {
  afterEach(cleanup);

  it('renders label element', () => {
    const tree = render(() => <Label>test-label</Label>).baseElement;
    expect(tree).toMatchSnapshot();
  });
});
