/** @format */

import { mergeProps, VoidComponent } from 'solid-js';

type InfoVariant = 'primary' | 'secondary';

type OptionalInfoProps = {
  variant: InfoVariant;
};

type InfoProps = {
  description: string;
  title: string;
} & Partial<OptionalInfoProps>;

const Info: VoidComponent<InfoProps> = (props) => {
  const merged = mergeProps({ variant: 'primary' }, props);
  return (
    <div
      class="space-16 radius-large align-center elevation-300 "
      classList={{
        'bg-primary-500': merged.variant === 'primary',
        'text-primary-100': merged.variant === 'primary',
      }}
    >
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default Info;

// TODO: move to alchemy later
