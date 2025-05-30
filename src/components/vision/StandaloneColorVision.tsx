import React, { useState } from 'react';
import { Eye, Wand2 } from 'lucide-react';
import { ColorVisionFilterStandalone } from './ColorVisionFilter';
import type { ColorVisionType } from '../../types';

interface StandaloneColorVisionProps {
  children: React.ReactNode;
  className?: string;
}

const visionTypes = [
  { type: 'protanopia', label: 'Protanopia (Red-Blind)' },
  { type: 'deuteranopia', label: 'Deuteranopia (Green-Blind)' },
  { type: 'tritanopia', label: 'Tritanopia (Blue-Blind)' },
  { type: 'achromatopsia', label: 'Achromatopsia (Total Color Blindness)' },
] as const;

export const StandaloneColorVision: React.FC<StandaloneColorVisionProps> = ({ children, className = '' }) => {
  const [visionType, setVisionType] = useState<ColorVisionType>(null);
  const [correction, setCorrection] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <ColorVisionFilterStandalone type={visionType} correction={correction}>
        {children}
      </ColorVisionFilterStandalone>

      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
          <select
            value={visionType || ''}
            onChange={(e) => setVisionType(e.target.value as ColorVisionType)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Normal Vision</option>
            {visionTypes.map(({ type, label }) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>

          {visionType && (
            <button
              onClick={() => setCorrection(!correction)}
              className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center ${
                correction
                  ? 'bg-accent-500 text-white hover:bg-accent-600'
                  : 'bg-accent-100 text-accent-700 hover:bg-accent-200'
              }`}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {correction ? 'Disable Correction' : 'Enable Correction'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};