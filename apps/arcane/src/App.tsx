/** @format */

import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Button from 'design/Button';

const App: FC = () => {
  return (
    <div>
      <h1>Welcome to Arcane</h1>
      <Button />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
