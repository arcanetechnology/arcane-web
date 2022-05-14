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
  test('standard button should have a border', () => {
    render(() => <Button data-testid="test-button">Test</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toHaveClass('border-small');
  });
  test('standard button should have elevation', () => {
    render(() => <Button data-testid="test-button">Test</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toHaveClass('elevation-200');
  });

  test('text button should be rendered when we pass the text variant', () => {
    render(() => (
      <Button data-testid="test-button" variant="text">
        Test
      </Button>
    ));
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('id', 'arcane-text-button');
  });

  test('text button should not have elevation', () => {
    render(() => (
      <Button variant="text" data-testid="test-button">
        Test
      </Button>
    ));
    const button = screen.getByTestId('test-button');
    expect(button).not.toHaveClass('elevation-200');
  });

  test('text button should not have border', () => {
    render(() => (
      <Button variant="text" data-testid="test-button">
        Test
      </Button>
    ));
    const button = screen.getByTestId('test-button');
    expect(button).not.toHaveClass('border-small');
  });
});
