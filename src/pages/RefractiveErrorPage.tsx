import React, { useState } from 'react';
import { Eye, ZoomIn, Focus, Glasses, Sparkles } from 'lucide-react';

const RefractiveErrorPage: React.FC = () => {
  const [blurLevel, setBlurLevel] = useState(0);
  const [textSize, setTextSize] = useState(16);
  const [distanceMode, setDistanceMode] = useState<'near' | 'far'>('near');
  const [correction, setCorrection] = useState(false);

  const sampleText = `
    This is a sample text to demonstrate how refractive error correction works.
    Adjust the settings to simulate different vision conditions and see how
    correction can improve visibility. The text adjusts based on your selected
    viewing distance and correction preferences.
  `;

  const getBlurStyle = () => {
    if (correction) {
      return {};
    }
    return {
      filter: `blur(${blurLevel}px)`,
      fontSize: `${textSize}px`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Refractive Error Support
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Adjust display settings to compensate for various refractive errors including myopia,
            hyperopia, astigmatism, and presbyopia.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Eye className="h-6 w-6 text-primary-600 mr-2" />
              Vision Settings
            </h2>

            <div className="space-y-6">
              {/* Blur Level */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Focus className="h-4 w-4 mr-2" />
                  Blur Level: {blurLevel}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={blurLevel}
                  onChange={(e) => setBlurLevel(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Text Size */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Text Size: {textSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Viewing Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Viewing Distance
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDistanceMode('near')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      distanceMode === 'near'
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    Near Vision
                  </button>
                  <button
                    onClick={() => setDistanceMode('far')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      distanceMode === 'far'
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    Far Vision
                  </button>
                </div>
              </div>

              {/* Correction Toggle */}
              <button
                onClick={() => setCorrection(!correction)}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  correction
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Glasses className="h-5 w-5 mr-2" />
                {correction ? 'Disable Correction' : 'Enable Correction'}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preview</h2>
            <div
              className="prose max-w-none"
              style={getBlurStyle()}
            >
              {sampleText.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Myopia (Nearsightedness)',
              description: 'Difficulty seeing distant objects clearly. Text and objects appear blurry when far away.',
              icon: Eye,
            },
            {
              title: 'Hyperopia (Farsightedness)',
              description: 'Trouble focusing on nearby objects. Reading and close-up work may cause eye strain.',
              icon: ZoomIn,
            },
            {
              title: 'Astigmatism',
              description: 'Blurred or distorted vision at all distances due to irregular cornea shape.',
              icon: Focus,
            },
            {
              title: 'Presbyopia',
              description: 'Age-related difficulty focusing on close objects, common after age 40.',
              icon: Glasses,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center mb-4">
                <card.icon className="h-6 w-6 text-primary-600 mr-2" />
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
            Vision Care Tips
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Regular Breaks',
                description: 'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
              },
              {
                title: 'Proper Lighting',
                description: 'Ensure adequate lighting for reading and close work to reduce eye strain.',
              },
              {
                title: 'Screen Distance',
                description: 'Maintain an arm\'s length distance from screens and adjust text size as needed.',
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <h3 className="font-medium text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefractiveErrorPage;