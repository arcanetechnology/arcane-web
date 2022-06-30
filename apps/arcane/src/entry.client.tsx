/** @format */
/* @refresh reload */
import { hydrate } from 'solid-js/web';
import { createApp } from './app';

hydrate(
  () => createApp(window.hydration),
  document.getElementById('root') as HTMLElement
);
