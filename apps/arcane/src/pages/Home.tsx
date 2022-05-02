/** @format */

import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <Fragment>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you</p>
      </main>
      <nav>
        <Link to={'/about'}>About</Link>
      </nav>
    </Fragment>
  );
};

export default Home;
