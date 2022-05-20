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

  it('renders input element with default id', () => {
    render(() => <Input name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('id');
  });

  it('renders input element with padding and rounded border', () => {
    render(() => <Input name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass('radius-small');
    expect(input).toHaveClass('padding-2');
  });
});
