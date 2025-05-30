import React from 'react';
import { Eye } from 'lucide-react';
import { useVisionStore } from '../store/useVisionStore';
import { ColorVisionType } from '../types';
import ColorVisionFilter from '../components/vision/ColorVisionFilter';

const colorVisionInfo = [
  {
    type: 'protanopia',
    title: 'Protanopia (Red-Blind)',
    description: 'Inability to perceive red light, making it difficult to distinguish between red and green colors. This affects approximately 1% of males.',
    example: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg',
  },
  {
    type: 'deuteranopia',
    title: 'Deuteranopia (Green-Blind)',
    description: 'Difficulty perceiving green light, resulting in problems distinguishing between red and green. This is the most common type of color blindness.',
    example: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
  },
  {
    type: 'tritanopia',
    title: 'Tritanopia (Blue-Blind)',
    description: 'Rare condition affecting blue light perception, making it hard to distinguish between blue and yellow colors.',
    example: 'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg',
  },
  {
    type: 'achromatopsia',
    title: 'Achromatopsia (Total Color Blindness)',
    description: 'Complete inability to perceive colors, seeing only in shades of gray. This is an extremely rare condition.',
    example: 'https://images.pexels.com/photos/1420702/pexels-photo-1420702.jpeg',
  },
];

const ColorVisionPage: React.FC = () => {
  const { colorVisionType, setColorVisionType } = useVisionStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Color Vision Simulation</h1>
        <p className="text-lg text-gray-600">
          Experience how different types of color blindness affect visual perception
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {colorVisionInfo.map((info) => (
          <div
            key={info.type}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            <ColorVisionFilter>
              <img
                src={info.example}
                alt={`Example for ${info.title}`}
                className="h-48 w-full object-cover"
              />
            </ColorVisionFilter>
            <div className="p-6">
              <div className="mb-4 flex items-center">
                <Eye className="mr-2 h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">{info.title}</h2>
              </div>
              <p className="mb-4 text-gray-600">{info.description}</p>
              <button
                onClick={() => setColorVisionType(info.type as ColorVisionType)}
                className={`w-full rounded-md px-4 py-2 text-center transition-colors ${
                  colorVisionType === info.type
                    ? 'bg-primary-600 text-white'
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
        <div className="mt-8 text-center">
          <button
            onClick={() => setColorVisionType(null)}
            className="rounded-md bg-gray-100 px-6 py-2 text-gray-700 hover:bg-gray-200"
          >
            Reset to Normal Vision
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorVisionPage;