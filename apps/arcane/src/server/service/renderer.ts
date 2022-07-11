/** @format */

import { EntryProps } from '../../types';

export const transformEntry = async (
  value: EntryProps,
  clientEntry: string
) => {
  const render = (await import(clientEntry))['render'];
  const { html } = await render(value);
  return { html };
};

const Renderer = {
  transformEntry,
};

export default Renderer;
