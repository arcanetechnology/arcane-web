/** @format */

import { ClientRenderer, EntryProps } from '../../types';

export const renderApp = async (value: EntryProps, clientEntry: string) => {
  const render: ClientRenderer = (await import(clientEntry))['render'];
  const { html, hydration, hydrationScript } = await render(value);
  return { html, hydration, hydrationScript };
};

const Renderer = {
  renderApp,
};

export default Renderer;
