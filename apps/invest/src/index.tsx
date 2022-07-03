/**
 * /* @refresh reload
 *
 * @format
 */

import { render } from 'solid-js/web';
import { createApp } from './App';
import '@arcane-web/alchemy';
import './index.scss';

render(() => createApp(), document.getElementById('root') as HTMLElement);
