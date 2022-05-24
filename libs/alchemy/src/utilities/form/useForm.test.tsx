/** @format */

import { useForm } from '.';
import { cleanup } from 'solid-testing-library';

describe('alchemy use form utility', () => {
  afterEach(cleanup);

  it('should be able to give error object with validate and formSubmit method', () => {
    const { errors, validate, formSubmit } = useForm({ errorClass: 'error' });
    expect(errors).toStrictEqual({});
    expect(validate).toBeDefined();
    expect(formSubmit).toBeDefined();
  });
});
