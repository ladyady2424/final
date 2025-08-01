import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductSelection from './components/ProductSelection';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/products" element={<ProductSelection />} />
  </Routes>
);

export default App;