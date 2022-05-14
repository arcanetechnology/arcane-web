/** @format */
import { Button } from './Button';
import { cleanup, render, screen } from 'solid-testing-library';
describe('alchemy button element', () => {
  afterEach(cleanup);

  test('default button instance is of standard variant', () => {
    render(() => <Button data-testid="test-button">Test</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('id', 'arcane-standard-button');
  });
  /*  test('standard button should have a border');
  test('standard button should have elevation');

  test('text button has no border');
  test('text button has no elevation'); */
});
