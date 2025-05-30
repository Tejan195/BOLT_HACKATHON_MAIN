import React from 'react';
import { Eye } from 'lucide-react';
import { useVisionStore } from '../store/useVisionStore';
import { ColorVisionType } from '../types';

const colorVisionInfo = [
  {
    type: 'protanopia',
    title: 'Protanopia (Red-Blind)',
    description: 'Inability to perceive red light, making it difficult to distinguish between red and green colors. This affects approximately 1% of males.',
    example: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg',
  },
  {
    type: 'deuteranopia',
    title: 'Deuteranopia (Green-Blind)',
    description: 'Difficulty perceiving green light, resulting in problems distinguishing between red and green. This is the most common type of color blindness.',
    example: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg',
  },
  {
    type: 'tritanopia',
    title: 'Tritanopia (Blue-Blind)',
    description: 'Rare condition affecting blue light perception, making it hard to distinguish between blue and yellow colors.',
    example: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg',
  },
  {
    type: 'achromatopsia',
    title: 'Achromatopsia (Total Color Blindness)',
    description: 'Complete inability to perceive colors, seeing only in shades of gray. This is an extremely rare condition.',
    example: 'https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg',
  },
];

const ColorVisionPage: React.FC = () => {
  const { colorVisionType, setColorVisionType } = useVisionStore();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center animate-fade-in">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Color Vision Simulation</h1>
        <p className="text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Experience how different types of color blindness affect visual perception
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {colorVisionInfo.map((info, index) => (
          <div
            key={info.type}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative overflow-hidden group">
              <img
                src={info.example}
                alt={`Example for ${info.title}`}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="p-8">
              <div className="mb-5 flex items-center">
                <Eye className="mr-3 h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">{info.title}</h2>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">{info.description}</p>
              <button
                onClick={() => setColorVisionType(info.type as ColorVisionType)}
                className={`w-full rounded-xl px-6 py-4 text-lg font-medium text-center transition-all duration-300 transform active:scale-95 ${
                  colorVisionType === info.type
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                {colorVisionType === info.type ? 'Currently Active' : 'Simulate This Vision'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {colorVisionType && (
        <div className="mt-12 text-center animate-fade-in">
          <button
            onClick={() => setColorVisionType(null)}
            className="rounded-xl bg-gray-100 px-8 py-4 text-lg font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Reset to Normal Vision
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorVisionPage;