/** @format */

import { renderToStringAsync } from 'solid-js/web';
import App from './App';

export async function render() {
  const renderPromise = renderToStringAsync(() => <App />);
  return {
    html: await renderPromise,
  };
}
