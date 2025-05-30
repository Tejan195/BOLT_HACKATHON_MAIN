import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/landing/Hero';
import ColorVisionPage from './pages/ColorVisionPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import ColorVisionFilter from './components/vision/ColorVisionFilter';
import { AuthProvider } from './components/auth/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ColorVisionFilter>
          <Layout>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/color-vision" element={<ColorVisionPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </Layout>
        </ColorVisionFilter>
      </AuthProvider>
    </Router>
  );
}

export default App;