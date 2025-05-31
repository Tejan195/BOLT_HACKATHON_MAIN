import React, { useState } from 'react';
import { ZoomIn, Sun, Moon, Type, Volume2, Eye } from 'lucide-react';

const LowVisionPage: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  const sampleText = `
    Welcome to the Low Vision Support Tools. These features are designed to make
    content more accessible for users with visual impairments. You can adjust text
    size, contrast, brightness, and enable screen magnification to suit your needs.
    
    The tools provided here include:
    • Screen magnification
    • High contrast mode
    • Adjustable text size
    • Brightness controls
    • Screen reader compatibility
  `;

  const getContrastMode = () => {
    if (highContrast) {
      return 'bg-black text-white';
    }
    return 'bg-white text-gray-900';
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 ${getContrastMode()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold sm:text-5xl lg:text-6xl mb-6 ${
            highContrast ? 'text-white' : 'text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text'
          }`}>
            Low Vision Support
          </h1>
          <p className={`text-lg sm:text-xl ${highContrast ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Customize your viewing experience with tools designed for low vision accessibility.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls Panel */}
          <div className={`rounded-xl shadow-sm border ${highContrast ? 'border-white/20 bg-gray-900' : 'border-gray-200 bg-white'} p-6`}>
            <h2 className={`text-2xl font-semibold mb-6 flex items-center ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              <Eye className={`h-6 w-6 ${highContrast ? 'text-primary-400' : 'text-primary-600'} mr-2`} />
              Vision Settings
            </h2>

            <div className="space-y-6">
              {/* Magnification */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Magnification: {Math.round(scale * 100)}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Type className="h-4 w-4 mr-2" />
                  Text Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="32"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Contrast */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Sun className="h-4 w-4 mr-2" />
                  Contrast: {Math.round(contrast * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Brightness */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Sun className="h-4 w-4 mr-2" />
                  Brightness: {Math.round(brightness * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* High Contrast Toggle */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  highContrast
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                }`}
              >
                {highContrast ? (
                  <Sun className="h-5 w-5 mr-2" />
                ) : (
                  <Moon className="h-5 w-5 mr-2" />
                )}
                {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
              </button>

              {/* Screen Reader Hint */}
              <div className={`mt-4 flex items-center p-4 rounded-lg ${
                highContrast ? 'bg-gray-800' : 'bg-primary-50'
              }`}>
                <Volume2 className={`h-5 w-5 mr-2 ${
                  highContrast ? 'text-primary-400' : 'text-primary-600'
                }`} />
                <p className={`text-sm ${
                  highContrast ? 'text-gray-300' : 'text-primary-700'
                }`}>
                  This page is optimized for screen readers. Use your screen reader's navigation commands to explore the content.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div 
            className={`rounded-xl shadow-sm border p-6 ${
              highContrast 
                ? 'border-white/20 bg-gray-900' 
                : 'border-gray-200 bg-white'
            }`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              filter: `contrast(${contrast}) brightness(${brightness})`,
            }}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              Preview
            </h2>
            <div 
              className="prose max-w-none"
              style={{ fontSize: `${fontSize}px` }}
            >
              {sampleText.split('\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`mb-4 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Accessibility Tips */}
        <div className={`mt-12 rounded-xl shadow-sm border p-6 ${
          highContrast ? 'border-white/20 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Accessibility Tips
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Use Keyboard Navigation',
                description: 'Press Tab to move between controls and Enter to activate buttons.',
                icon: Type,
              },
              {
                title: 'Screen Reader Support',
                description: 'All controls are labeled for screen reader compatibility.',
                icon: Volume2,
              },
              {
                title: 'Customize Settings',
                description: 'Adjust settings until you find the most comfortable viewing experience.',
                icon: Sun,
              },
            ].map((tip, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 ${
                  highContrast 
                    ? 'bg-gray-800 border border-white/10' 
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center mb-2">
                  <tip.icon className={`h-5 w-5 mr-2 ${
                    highContrast ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-medium ${
                    highContrast ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tip.title}
                  </h3>
                </div>
                <p className={`text-sm ${
                  highContrast ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowVisionPage;