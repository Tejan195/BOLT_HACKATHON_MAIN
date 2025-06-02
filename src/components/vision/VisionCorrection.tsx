import React, { useEffect, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !visionType) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Clear previous content
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Convert container content to image
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${container.innerHTML}
        </div>
      </foreignObject>
    </svg>`;

    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      // Apply pre-correction effects if correction is enabled
      if (correction) {
        // Simulate how corrective lenses bend light
        ctx.filter = 'none';
        ctx.transform(1, 0, 0, 1, 0, 0);
        
        switch (visionType) {
          case 'myopia':
            // Simulate diverging lens effect
            ctx.scale(1 - severity * 0.01, 1 - severity * 0.01);
            break;
          case 'hyperopia':
            // Simulate converging lens effect
            ctx.scale(1 + severity * 0.01, 1 + severity * 0.01);
            break;
          case 'astigmatism':
            // Simulate cylindrical lens effect
            ctx.transform(
              1, severity * 0.02,
              -severity * 0.02, 1,
              0, 0
            );
            break;
        }
      }

      // Draw the content
      ctx.drawImage(img, 0, 0);

      // Apply post-correction effects
      if (!correction) {
        // Simulate uncorrected vision issues
        const baseBlur = severity * 0.5;
        switch (visionType) {
          case 'myopia':
            ctx.filter = distanceMode === 'far' 
              ? `blur(${baseBlur * 1.5}px)` 
              : `blur(${baseBlur * 0.5}px)`;
            break;
          case 'hyperopia':
            ctx.filter = distanceMode === 'near'
              ? `blur(${baseBlur * 1.5}px)`
              : `blur(${baseBlur * 0.5}px)`;
            break;
          case 'astigmatism':
            ctx.filter = `blur(${baseBlur}px)`;
            ctx.transform(
              1, severity * 0.05,
              -severity * 0.05, 1,
              0, 0
            );
            break;
          case 'presbyopia':
            ctx.filter = distanceMode === 'near'
              ? `blur(${baseBlur * 1.2}px)`
              : `blur(${baseBlur * 0.3}px)`;
            break;
        }
        ctx.drawImage(canvas, 0, 0);
      }

      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, [visionType, severity, correction, distanceMode]);

  return (
    <div className="relative">
      <div ref={containerRef} className="invisible absolute">
        {children}
      </div>
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};