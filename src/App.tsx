import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/landing/Hero';
import ColorVisionPage from './pages/ColorVisionPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/color-vision" element={<ColorVisionPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;