import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './components/auth/AuthProvider';
import { Toaster } from 'sonner';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components
const Hero = React.lazy(() => import('./components/landing/Hero'));
const ColorVisionPage = React.lazy(() => import('./pages/ColorVisionPage'));
const VisionSimulationPage = React.lazy(() => import('./pages/VisionSimulationPage'));
const DyslexiaPage = React.lazy(() => import('./pages/DyslexiaPage'));
const LowVisionPage = React.lazy(() => import('./pages/LowVisionPage'));
const RefractiveErrorPage = React.lazy(() => import('./pages/RefractiveErrorPage'));
const ExercisePage = React.lazy(() => import('./pages/ExercisePage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const ColorVisionFilter = React.lazy(() => import('./components/vision/ColorVisionFilter'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <ColorVisionFilter>
            <Layout>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/color-vision" element={<ColorVisionPage />} />
                <Route path="/color-vision/:type" element={<VisionSimulationPage />} />
                <Route path="/dyslexia" element={<DyslexiaPage />} />
                <Route path="/low-vision" element={<LowVisionPage />} />
                <Route path="/refractive" element={<RefractiveErrorPage />} />
                <Route path="/exercise" element={<ExercisePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/account" element={<AccountPage />} />
              </Routes>
            </Layout>
          </ColorVisionFilter>
        </Suspense>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;