/** @format */

import { RadioButton } from './Radio';
import { cleanup, render, screen } from 'solid-testing-library';

describe('alchemy radio button element', () => {
  afterEach(cleanup);
  it('renders input element of radio type', () => {
    render(() => (
      <RadioButton
        name="test-input"
        label="test-input"
        id="test-input"
        data-testid="test-input"
      />
    ));
    const input = screen.getByTestId('test-input');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'radio');
  });

  it('renders label for radio button element', () => {
    render(() => (
      <RadioButton
        name="test-input"
        label="test-input"
        id="test-input"
        data-testid="test-input"
      />
    ));

    const label = screen.getByText('test-input');
    expect(label.tagName).toBe('LABEL');
  });

  it('renders label above radio element if position is set up', () => {
    render(() => (
      <RadioButton
        name="test-input"
        label="test-input"
        id="test-input"
        data-testid="test-input"
        position="up"
      />
    ));

    const input = screen.getByText('test-input').nextSibling;
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('type', 'radio');
  });
});
