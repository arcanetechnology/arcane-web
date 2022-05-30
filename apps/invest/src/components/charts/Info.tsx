/** @format */

import { mergeProps, VoidComponent } from 'solid-js';
import { Card } from '@arcane-web/alchemy';

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
    <Card
      class="align-center"
      classList={{
        'bg-primary-500': merged.variant === 'primary',
        'text-primary-100': merged.variant === 'primary',
      }}
    >
      <h3>{props.title}</h3>
      <p class="description">{props.description}</p>
    </Card>
  );
};

export default Info;

// TODO: move to alchemy later
