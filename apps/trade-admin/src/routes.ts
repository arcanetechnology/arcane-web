/** @format */

import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';
import { getUsers, getUserInfo } from './api/users';

export const routes: RouteDefinition[] = [
  {
    path: '/users',
    component: lazy(() => import('./pages/users')),
    data: getUsers,
  },
  {
    path: '/users/:id',
    component: lazy(() => import('./pages/users/[id]')),
    data: ({ params }) => getUserInfo(params['id']),
  },
  {
    path: '/',
    component: lazy(() => import('./pages/home')),
  },
];
