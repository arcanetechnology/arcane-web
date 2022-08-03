/** @format */

import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';

import Landing from './pages/Landing';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/home',
    component: lazy(() => import('./pages/Home')),
  },
  { path: '/nonprofessional', component: lazy(() => import('./pages/Error')) },
  {
    path: '**',
    component: Landing,
  },
];
