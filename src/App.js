import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import First from './First';
import Second from './Second';
import Third from './Third';

const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<First/>} />
        <Route path="/login" element={<Second />} />
        <Route path="/details" element={<Third />} />
      </Routes>
  </Router>
);

export default App;
