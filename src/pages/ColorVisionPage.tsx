import React, { useState } from 'react';
import { Eye, Wand2 } from 'lucide-react';
import { useVisionStore } from '../store/useVisionStore';
import { ColorVisionType } from '../types';

const colorVisionInfo = [
  {
    type: 'protanopia',
    title: 'Protanopia (Red-Blind)',
    description: 'Inability to perceive red light, making it difficult to distinguish between red and green colors. This affects approximately 1% of males.',
    example: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=50',
  },
  {
    type: 'deuteranopia',
    title: 'Deuteranopia (Green-Blind)',
    description: 'Difficulty perceiving green light, resulting in problems distinguishing between red and green. This is the most common type of color blindness.',
    example: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=50',
  },
  {
    type: 'tritanopia',
    title: 'Tritanopia (Blue-Blind)',
    description: 'Rare condition affecting blue light perception, making it hard to distinguish between blue and yellow colors.',
    example: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=50',
  },
  {
    type: 'achromatopsia',
    title: 'Achromatopsia (Total Color Blindness)',
    description: 'Complete inability to perceive colors, seeing only in shades of gray. This is an extremely rare condition.',
    example: 'https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&w=50',
  },
];

const ColorVisionPage: React.FC = () => {
  const { colorVisionType, setColorVisionType, correctionEnabled, setCorrectionEnabled } = useVisionStore();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (type: string) => {
    setLoadedImages(prev => ({ ...prev, [type]: true }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: ColorVisionType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setColorVisionType(type);
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6 text-gray-900">
                Color Vision Simulation
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Experience how different types of color blindness affect visual perception. Select a type to
                simulate and use color correction to enhance visibility.
              </p>
            </div>

            <div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              role="list"
              aria-label="Color vision types"
            >
              {colorVisionInfo.map((info, index) => (
                <div
                  key={info.type}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  role="listitem"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50 transition-opacity duration-300"
                      style={{ 
                        backgroundImage: `url(${info.thumbnail})`,
                        opacity: loadedImages[info.type] ? 0 : 0.5 
                      }}
                      aria-hidden="true"
                    />
                    <img
                      src={info.example}
                      alt={`Visual example of ${info.title}`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(info.type)}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        loadedImages[info.type] 
                          ? 'opacity-100 group-hover:scale-110' 
                          : 'opacity-0'
                      }`}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Eye className="h-5 w-5 text-primary-600 mr-2" aria-hidden="true" />
                      <h2 className="text-lg font-semibold text-gray-900">{info.title}</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 mb-4">{info.description}</p>
                    <button
                      onClick={() => setColorVisionType(info.type as ColorVisionType)}
                      onKeyDown={(e) => handleKeyPress(e, info.type as ColorVisionType)}
                      className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        colorVisionType === info.type
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                      aria-pressed={colorVisionType === info.type}
                    >
                      {colorVisionType === info.type ? 'Currently Active' : 'Simulate This Vision'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {colorVisionType && (
              <div 
                className="mt-12 flex flex-col items-center space-y-4 animate-fade-in"
                role="group"
                aria-label="Vision control options"
              >
                <button
                  onClick={() => setCorrectionEnabled(!correctionEnabled)}
                  className={`rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    correctionEnabled
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                  aria-pressed={correctionEnabled}
                >
                  <span className="flex items-center">
                    <Wand2 className="h-5 w-5 mr-2" />
                    {correctionEnabled ? 'Disable Color Correction' : 'Enable Color Correction'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setColorVisionType(null);
                    setCorrectionEnabled(false);
                  }}
                  className="text-sm text-gray-500 hover:text-primary-600 transition-colors duration-300"
                  aria-label="Reset to normal vision"
                >
                  Reset to Normal Vision
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorVisionPage;