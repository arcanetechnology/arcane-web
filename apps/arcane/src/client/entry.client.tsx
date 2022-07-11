/** @format */
/* @refresh reload */
import { hydrate } from 'solid-js/web';
import App from './App';

hydrate(() => <App />, document.getElementById('app') as HTMLElement);
