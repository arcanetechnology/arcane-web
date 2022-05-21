/** @format */

export type Country = {
  name: string;
  flag: string;
};

export type Countries = Array<Country>;

// TODO: export document type from rich-text-renderer.
export type OnboardingNode = {
  name: string;
  content: any;
};

export type OnboardingNodes = Array<OnboardingNode>;
