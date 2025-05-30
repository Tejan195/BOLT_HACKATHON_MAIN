import React from 'react';
import { useVisionStore } from '../../store/useVisionStore';

const filters = {
  protanopia: 'saturate(0.5) sepia(0.3) hue-rotate(-20deg)',
  deuteranopia: 'saturate(0.6) sepia(0.2) hue-rotate(20deg)',
  tritanopia: 'saturate(0.7) sepia(0.4) hue-rotate(180deg)',
  achromatopsia: 'grayscale(1)',
};

const ColorVisionFilter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorVisionType } = useVisionStore();

  const filterStyle = colorVisionType ? { filter: filters[colorVisionType] } : undefined;

  return <div style={filterStyle}>{children}</div>;
};

export default ColorVisionFilter;