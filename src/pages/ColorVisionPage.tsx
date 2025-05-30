import React, { useState } from 'react';
import { Eye } from 'lucide-react';
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
  const { colorVisionType, setColorVisionType } = useVisionStore();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (type: string) => {
    setLoadedImages(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center animate-fade-in">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Color Vision Simulation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience how different types of color blindness affect visual perception
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {colorVisionInfo.map((info, index) => (
          <div
            key={info.type}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50 transition-opacity duration-300"
                style={{ 
                  backgroundImage: `url(${info.thumbnail})`,
                  opacity: loadedImages[info.type] ? 0 : 0.5 
                }}
              />
              <img
                src={info.example}
                alt={`Example for ${info.title}`}
                loading="lazy"
                onLoad={() => handleImageLoad(info.type)}
                className={`h-40 w-full object-cover transition-all duration-700 ${
                  loadedImages[info.type] 
                    ? 'opacity-100 group-hover:scale-110' 
                    : 'opacity-0'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center">
                <Eye className="mr-2 h-4 w-4 text-primary-600" />
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">{info.title}</h2>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{info.description}</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setColorVisionType(info.type as ColorVisionType)}
                  className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-center transition-all duration-300 transform active:scale-95 ${
                    colorVisionType === info.type
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Simulate This Vision
                </button>
                {colorVisionType === info.type && (
                  <button
                    onClick={() => setColorVisionType(null)}
                    className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Reset Vision
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorVisionPage;