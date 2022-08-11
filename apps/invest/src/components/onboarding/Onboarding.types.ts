/** @format */

import { Questions } from './config';

export type OnboardingFormPages = {
  onSubmit: (values: any) => void;
  onBack: (values: any) => void;
  route: Questions;
  progress: number;
  totalPages: number;
  formData: Array<Record<string, any>>;
};

export type OnboardingNode = {
  name: string;
  content: any;
};

export type OnboardingNodes = Array<OnboardingNode>;
