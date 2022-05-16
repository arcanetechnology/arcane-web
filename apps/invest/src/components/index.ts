/** @format */

import { Document } from '@contentful/rich-text-types';

/** @format */

export type OnboardingNode = {
  name: string;
  content: Document;
};

export type OnboardingNodes = Array<OnboardingNode>;

export { default as Onboarding } from './Onboarding';
