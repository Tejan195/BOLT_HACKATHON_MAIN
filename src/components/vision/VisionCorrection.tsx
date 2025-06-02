import React from 'react';

interface VisionCorrectionProps {
  children: React.ReactNode;
  visionType: 'myopia' | 'hyperopia' | 'astigmatism' | 'presbyopia' | null;
  severity: number;
  correction: boolean;
  distanceMode: 'near' | 'far';
}

export const VisionCorrection: React.FC<VisionCorrectionProps> = ({
  children,
  visionType,
  severity,
  correction,
  distanceMode,
}) => {
  const getBlurAmount = () => {
    if (!visionType || correction) return 0;
    const baseBlur = severity * 0.5;
    
    switch (visionType) {
      case 'myopia':
        return distanceMode === 'far' ? baseBlur * 1.5 : baseBlur * 0.5;
      case 'hyperopia':
        return distanceMode === 'near' ? baseBlur * 1.5 : baseBlur * 0.5;
      case 'astigmatism':
        return baseBlur;
      case 'presbyopia':
        return distanceMode === 'near' ? baseBlur * 1.2 : baseBlur * 0.3;
      default:
        return 0;
    }
  };

  const getDistortion = () => {
    if (!visionType || correction) return '';
    const baseDistortion = severity * 2;
    
    switch (visionType) {
      case 'astigmatism':
        return `skew(${baseDistortion}deg, ${baseDistortion * 0.5}deg)`;
      case 'myopia':
        return distanceMode === 'far' ? `scale(${1 - baseDistortion * 0.05})` : '';
      case 'hyperopia':
        return distanceMode === 'near' ? `scale(${1 + baseDistortion * 0.05})` : '';
      default:
        return '';
    }
  };

  const getPreCorrection = () => {
    if (!correction || !visionType) return '';
    const correctionAmount = severity * 0.5;
    
    switch (visionType) {
      case 'myopia':
        return `scale(${1 + correctionAmount * 0.05})`;
      case 'hyperopia':
        return `scale(${1 - correctionAmount * 0.05})`;
      case 'astigmatism':
        return `skew(${-correctionAmount}deg, ${-correctionAmount * 0.5}deg)`;
      default:
        return '';
    }
  };

  return (
    <div
      style={{
        filter: `blur(${getBlurAmount()}px)`,
        transform: correction ? getPreCorrection() : getDistortion(),
        transition: 'all 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
};