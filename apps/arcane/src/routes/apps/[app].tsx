/** @format */

import type { VoidComponent } from 'solid-js';

const App: VoidComponent = () => {
  const params = useParams();

  return <>{params.app}</>;
};

export default App;
