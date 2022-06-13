/** @format */
import { Button } from './Button';
import { cleanup, render, screen } from 'solid-testing-library';
describe('alchemy button element', () => {
  afterEach(cleanup);

  test('text button should not have elevation', () => {
    render(() => (
      <Button variant="tertiary" data-testid="test-button">
        Test
      </Button>
    ));
    const button = screen.getByTestId('test-button');
    expect(button).not.toHaveClass('elevation-200');
  });

  test('text button should not have border', () => {
    render(() => (
      <Button variant="tertiary" data-testid="test-button">
        Test
      </Button>
    ));
    const button = screen.getByTestId('test-button');
    expect(button).not.toHaveClass('border-small');
  });
});
