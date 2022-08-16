/** @format */
// @refresh reload
import {
  StartServer,
  createHandler,
  renderAsync,
} from 'solid-start/entry-server';

export default createHandler(
  renderAsync((context) => <StartServer context={context} />) as any
);

// TODO: create express server and add tailorx to it.
// TODO: serve dist folder as template.
// TODO: add trade as child application
// TODO: add authentication to that app
// TODO: convert invest as child application.
