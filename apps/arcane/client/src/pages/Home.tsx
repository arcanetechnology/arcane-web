/** @format */

import type { VoidComponent } from 'solid-js';

const Home: VoidComponent = () => {
  return (
    <div>
      <h1>home from client</h1>
      <button id="sup" onClick={() => window.alert('you clicked')}>
        Hello World
      </button>
      <script type="fragment" src="http://localhost:8081" />
    </div>
  );
};

export default Home;
