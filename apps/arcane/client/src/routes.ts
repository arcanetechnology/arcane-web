/** @format */

import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';

export const LANDING = '/';
export const AUTH = '/auth';
export const HOME = '/home';
export const ERROR = '/error';

export const routes: RouteDefinition[] = [
  {
    path: LANDING,
    component: lazy(() => import('./pages/Landing')),
  },
  {
    path: AUTH,
    component: lazy(() => import('./pages/Login')),
  },
  {
    path: HOME,
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: ERROR,
    component: lazy(() => import('./pages/Error')),
  },
];
