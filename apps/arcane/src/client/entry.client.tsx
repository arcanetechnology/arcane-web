/** @format */
/* @refresh reload */
import { hydrate } from 'solid-js/web';
import { createApp } from './App';

hydrate(
  () => createApp(window.hydration),
  document.getElementById('app') as HTMLElement
);
