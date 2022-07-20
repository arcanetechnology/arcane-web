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
