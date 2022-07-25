/** @format */

import {
  StartServer,
  createHandler,
  renderAsync,
} from 'solid-start/entry-server';

export default createHandler(
  renderAsync((context) => {
    return <StartServer context={context} />;
  }) as any
);
