/** @format */

import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

const About: FC = () => {
  return (
    <Fragment>
      <main>
        <h2>Who are we?</h2>
        <p> That feels like an existencial question, dont you think?</p>
      </main>
      <nav>
        <Link to={'/'}>Home</Link>
      </nav>
    </Fragment>
  );
};

export default About;
