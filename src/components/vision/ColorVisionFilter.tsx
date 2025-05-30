import React, { memo } from 'react';
import { useVisionStore } from '../../store/useVisionStore';

const filters = {
  protanopia: 'saturate(0.5) sepia(0.3) hue-rotate(-20deg)',
  deuteranopia: 'saturate(0.6) sepia(0.2) hue-rotate(20deg)',
  tritanopia: 'saturate(0.7) sepia(0.4) hue-rotate(180deg)',
  achromatopsia: 'grayscale(1)',
} as const;

const correctionFilters = {
  protanopia: 'saturate(1.2) hue-rotate(20deg)',
  deuteranopia: 'saturate(1.3) hue-rotate(-20deg)',
  tritanopia: 'saturate(1.4) hue-rotate(-180deg)',
  achromatopsia: 'contrast(1.5) brightness(1.2) saturate(2)',
} as const;

export const createColorVisionFilter = (type: keyof typeof filters | null, correction: boolean = false) => {
  if (!type) return '';
  return correction ? correctionFilters[type] : filters[type];
};

export const ColorVisionFilterStandalone = memo<{
  type: keyof typeof filters | null;
  correction?: boolean;
  children: React.ReactNode;
}>(({ type, correction = false, children }) => {
  const filterStyle = type ? { filter: createColorVisionFilter(type, correction) } : undefined;
  return <div style={filterStyle}>{children}</div>;
});

ColorVisionFilterStandalone.displayName = 'ColorVisionFilterStandalone';

const ColorVisionFilter = memo<{ children: React.ReactNode }>(({ children }) => {
  const { colorVisionType, correctionEnabled } = useVisionStore();

  const getFilter = () => {
    if (!colorVisionType) return undefined;
    if (correctionEnabled) {
      return { filter: correctionFilters[colorVisionType] };
    }
    return { filter: filters[colorVisionType] };
  };

  return <div style={getFilter()}>{children}</div>;
});

ColorVisionFilter.displayName = 'ColorVisionFilter';

export default ColorVisionFilter;