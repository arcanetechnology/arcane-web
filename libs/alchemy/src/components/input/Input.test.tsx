/** @format */

import { Input } from './Input';
import { cleanup, render, screen } from 'solid-testing-library';

describe('alchemy input element', () => {
  afterEach(cleanup);

  it('renders input without full width if we do not full width', () => {
    render(() => <Input name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).not.toHaveClass('w-full');
  });

  it('renders input with full width if we specify props with full width', () => {
    render(() => (
      <Input name="test-input" data-testid="test-input" fullWidth />
    ));
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass('w-full');
  });

  it('renders label element if label string is passed to the component', () => {
    const tree = render(() => (
      <Input name="test-input" data-testid="test" label="test-input" />
    )).baseElement;

    expect(tree).toMatchSnapshot();
  });
});
