import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'sonner';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components
const Hero = React.lazy(() => import('./components/landing/Hero'));
const ColorVisionPage = React.lazy(() => import('./pages/ColorVisionPage'));
const VisionSimulationPage = React.lazy(() => import('./pages/VisionSimulationPage'));
const DyslexiaPage = React.lazy(() => import('./pages/DyslexiaPage'));
const ExercisePage = React.lazy(() => import('./pages/ExercisePage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const NewPasswordForm = React.lazy(() => import('./components/auth/NewPasswordForm'));
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
                <Route path="/exercise" element={<ExercisePage />} />
                <Route 
                  path="/auth" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <AuthPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/auth/reset-password" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <NewPasswordForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/account" 
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <AccountPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Layout>
          </ColorVisionFilter>
        </Suspense>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;