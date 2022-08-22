/** @format */

import { renderToString, generateHydrationScript } from 'solid-js/web';
import App from './App';
export function render() {
  const body = renderToString(() => <App />);
  const hydration = generateHydrationScript();
  return { body, hydration };
}
