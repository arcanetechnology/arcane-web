/** @format */

import Form from './Form';
import { cleanup, render, screen } from 'solid-testing-library';

describe('alchemy form element', () => {
  afterEach(cleanup);
  it('renders the form component', () => {
    render(() => <Form id="myForm">Hello World</Form>);
    const element = screen.getByText('Hello World');
    expect(element.tagName).toBe('FORM');
  });
});
