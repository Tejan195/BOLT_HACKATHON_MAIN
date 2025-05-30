import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/landing/Hero';
import ColorVisionFilter from './components/vision/ColorVisionFilter';
import ColorVisionControls from './components/vision/ColorVisionControls';

function App() {
  return (
    <ColorVisionFilter>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-[1fr_300px]">
            <Hero />
            <div className="space-y-6">
              <ColorVisionControls />
            </div>
          </div>
        </div>
      </Layout>
    </ColorVisionFilter>
  );
}

export default App;