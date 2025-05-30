import React from 'react';
import { Eye } from 'lucide-react';
import { useVisionStore } from '../../store/useVisionStore';
import { ColorVisionType } from '../../types';

const colorVisionOptions: { type: ColorVisionType; label: string }[] = [
  { type: null, label: 'Normal Vision' },
  { type: 'protanopia', label: 'Protanopia (Red-Blind)' },
  { type: 'deuteranopia', label: 'Deuteranopia (Green-Blind)' },
  { type: 'tritanopia', label: 'Tritanopia (Blue-Blind)' },
  { type: 'achromatopsia', label: 'Achromatopsia (Total Color Blindness)' },
];

const ColorVisionControls: React.FC = () => {
  const { colorVisionType, setColorVisionType } = useVisionStore();

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center">
        <Eye className="mr-2 h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Color Vision Settings</h2>
      </div>
      <div className="space-y-2">
        {colorVisionOptions.map((option) => (
          <button
            key={option.type || 'normal'}
            onClick={() => setColorVisionType(option.type)}
            className={`w-full rounded-md px-4 py-2 text-left transition-colors ${
              colorVisionType === option.type
                ? 'bg-primary-100 text-primary-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorVisionControls;