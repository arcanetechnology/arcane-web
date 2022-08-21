/** @format */

import type { VoidComponent } from 'solid-js';

const App: VoidComponent = () => {
  return <h1>header <button onClick={() => alert("hello")}>Hello</button></h1>;
};

export default App;
