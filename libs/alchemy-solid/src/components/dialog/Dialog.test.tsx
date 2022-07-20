/** @format */

import Dialog from './Dialog';
import { cleanup, render, screen } from 'solid-testing-library';

describe('alchemy dialog element', () => {
  afterEach(cleanup);
  it('renders the dialog component', () => {
    render(() => (
      <Dialog id="myDialog" open={true}>
        Hello World
      </Dialog>
    ));
    const element = screen.getByText('Hello World');
    expect(element.tagName).toBe('DIALOG');
  });
});
