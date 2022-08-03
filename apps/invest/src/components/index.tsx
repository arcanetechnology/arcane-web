/** @format */

import { createMediaQuery } from '@solid-primitives/media';

export { default as Shell } from './shell/Shell';
export { default as Private } from './private/Private';
export { default as Footer } from './footer/Footer';
export { default as Header } from './header/Header';
export { default as LandingComponent } from './landing/LandingComponent';
export * from './onboarding';
export * from './charts';

export const isSmall = createMediaQuery('(max-width: 767px)');
