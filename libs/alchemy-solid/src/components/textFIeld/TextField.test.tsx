/** @format */

import { TextField } from './TextField';
import { cleanup, render, screen } from 'solid-testing-library';

describe('alchemy text field element', () => {
  afterEach(cleanup);

  it('renders an element of input type', () => {
    render(() => <TextField name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input.tagName).toBe('INPUT');
  });

  it('renders input of type text', () => {
    render(() => <TextField name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders input without full width if we do not full width', () => {
    render(() => <TextField name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).not.toHaveClass('w-full');
  });

  it('renders input with full width if we give full width', () => {
    render(() => (
      <TextField name="test-input" data-testid="test-input" fullWidth />
    ));
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass('w-full');
  });

  it('renders input with a label if we provide a label property', () => {
    render(() => (
      <TextField
        name="test-input"
        data-testid="test-input"
        label="test-label"
      />
    ));
    const label = screen.getByText('test-label');
    expect(label.tagName).toBe('LABEL');
  });
});
