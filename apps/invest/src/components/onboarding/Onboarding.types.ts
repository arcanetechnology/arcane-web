/** @format */

import { Questions } from './config';

export type OnboardingFormPages = {
  onSubmit: (values: any) => void;
  onBack: (values: any) => void;
  route: Questions;
};
