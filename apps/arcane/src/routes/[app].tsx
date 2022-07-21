/** @format */

import type { VoidComponent } from 'solid-js';
import { Public } from '~/components';

const Id: VoidComponent = () => {
  const params = useParams();
  return <Public>Hi {params.app}</Public>;
};

export default Id;
