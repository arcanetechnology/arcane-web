/** @format */

import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';

import Landing from './pages/landing';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/arcane',
    component: lazy(() => import('./pages/arcane')),
  },
  { path: '/login', component: lazy(() => import('./pages/login')) },
  {
    path: '**',
    component: lazy(() => import('./pages/404')),
  },
];
