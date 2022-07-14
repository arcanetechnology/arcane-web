/** @format */

import { mergeProps, VoidComponent } from 'solid-js';
import { Card } from '@arcane-web/alchemy-solid';
import { Transition } from 'solid-transition-group';

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
  const base = { opacity: 1 };
  const options = { duration: 500 };
  const animateIn = (el) => {
    el.animate([{ opacity: 0 }, base], options);
  };
  return (
    <Transition onEnter={animateIn} appear={true}>
      <Card
        class="align-center"
        classList={{
          'bg-primary-500': merged.variant === 'primary',
          'text-primary-100': merged.variant === 'primary',
        }}
      >
        <h6>{props.title}</h6>
        <p class="small">{props.description}</p>
      </Card>
    </Transition>
  );
};

export default Info;

// TODO: move to alchemy later
