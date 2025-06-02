import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, Sun, Moon, Type, Volume2, Eye, Focus, Glasses, Ruler, Crosshair } from 'lucide-react';

const LowVisionPage: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [correction, setCorrection] = useState(false);
  const [focalPoint, setFocalPoint] = useState({ x: 0, y: 0 });
  const [astigmatismAngle, setAstigmatismAngle] = useState(0);
  const [astigmatismStrength, setAstigmatismStrength] = useState(0);
  const [sphericalPower, setSphericalPower] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [viewingDistance, setViewingDistance] = useState(60); // cm

  // Simulate actual vision correction by applying inverse transformations
  const calculateCorrectionTransform = () => {
    if (!correction) return '';
    
    const transforms = [];
    
    // Correct spherical error (myopia/hyperopia)
    if (sphericalPower !== 0) {
      // Simulate lens power correction
      const scaleFactor = 1 + (sphericalPower * 0.01);
      transforms.push(`scale(${scaleFactor})`);
    }

    // Correct astigmatism
    if (astigmatismStrength !== 0) {
      // Apply inverse cylindrical correction
      transforms.push(
        `rotate(${astigmatismAngle}deg)`,
        `skew(${-astigmatismStrength}deg, ${-astigmatismStrength * 0.5}deg)`,
        `rotate(${-astigmatismAngle}deg)`
      );
    }

    return transforms.join(' ');
  };

  // Calculate blur based on viewing distance and prescription
  const calculateBlur = () => {
    if (correction) return 0;
    
    // Base blur from spherical error
    let blur = Math.abs(sphericalPower) * 0.1;
    
    // Additional blur from astigmatism
    blur += astigmatismStrength * 0.05;
    
    // Adjust blur based on viewing distance
    const distanceFactor = Math.abs(viewingDistance - 60) / 30;
    blur *= (1 + distanceFactor);
    
    return blur;
  };

  // Simulate peripheral vision loss
  const calculateVignette = () => {
    if (!correction && sphericalPower < 0) {
      const intensity = Math.abs(sphericalPower) * 5;
      return `radial-gradient(
        circle at ${focalPoint.x}px ${focalPoint.y}px,
        transparent ${70 - intensity}%,
        rgba(0,0,0,${intensity * 0.1}) 100%
      )`;
    }
    return 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        setFocalPoint({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sampleText = `
    This text demonstrates how vision correction works. The simulation takes into
    account factors like viewing distance, spherical power (myopia/hyperopia),
    and astigmatism. Move your mouse to see how peripheral vision is affected.

    Vision correction involves complex optical principles. When light enters the eye,
    it's bent by the cornea and lens to focus on the retina. Vision problems occur
    when this focus point is either in front of or behind the retina, or when the
    cornea is irregularly shaped (astigmatism).

    Corrective lenses work by adding or subtracting optical power to compensate for
    these focusing errors. The simulation demonstrates this by applying appropriate
    transformations to the content, similar to how actual corrective lenses work.
  `;

  const images = [
    {
      url: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1280',
      title: 'Distance Vision Test',
      description: 'Urban landscape with varying depths'
    },
    {
      url: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1280',
      title: 'Near Vision Test',
      description: 'Reading material at close range'
    },
    {
      url: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1280',
      title: 'Visual Acuity Test',
      description: 'Signs at different distances'
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-16 ${highContrast ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold sm:text-5xl lg:text-6xl mb-6 ${
            highContrast ? 'text-white' : 'text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text'
          }`}>
            Advanced Vision Correction
          </h1>
          <p className={`text-lg sm:text-xl ${highContrast ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Experience realistic vision correction simulation based on optical principles.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls Panel */}
          <div className={`rounded-xl shadow-sm border ${highContrast ? 'border-white/20 bg-gray-900' : 'border-gray-200 bg-white'} p-6`}>
            <h2 className={`text-2xl font-semibold mb-6 flex items-center ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              <Eye className={`h-6 w-6 ${highContrast ? 'text-primary-400' : 'text-primary-600'} mr-2`} />
              Vision Settings
            </h2>

            <div className="space-y-6">
              {/* Spherical Power */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Focus className="h-4 w-4 mr-2" />
                  Spherical Power: {sphericalPower.toFixed(1)} D
                </label>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="0.25"
                  value={sphericalPower}
                  onChange={(e) => setSphericalPower(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>Myopia</span>
                  <span>Hyperopia</span>
                </div>
              </div>

              {/* Astigmatism Strength */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Crosshair className="h-4 w-4 mr-2" />
                  Astigmatism: {astigmatismStrength.toFixed(1)}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={astigmatismStrength}
                  onChange={(e) => setAstigmatismStrength(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Astigmatism Angle */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Ruler className="h-4 w-4 mr-2" />
                  Axis: {astigmatismAngle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={astigmatismAngle}
                  onChange={(e) => setAstigmatismAngle(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Viewing Distance */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Viewing Distance: {viewingDistance} cm
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={viewingDistance}
                  onChange={(e) => setViewingDistance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Type className="h-4 w-4 mr-2" />
                  Text Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="32"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Contrast */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Sun className="h-4 w-4 mr-2" />
                  Contrast: {Math.round(contrast * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Brightness */}
              <div>
                <label className={`flex items-center text-sm font-medium mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Sun className="h-4 w-4 mr-2" />
                  Brightness: {Math.round(brightness * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Vision Correction Toggle */}
              <button
                onClick={() => setCorrection(!correction)}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  correction
                    ? highContrast ? 'bg-white text-black' : 'bg-primary-600 text-white'
                    : highContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <Glasses className="h-5 w-5 mr-2" />
                {correction ? 'Remove Correction' : 'Apply Correction'}
              </button>

              {/* High Contrast Toggle */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  highContrast
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                }`}
              >
                {highContrast ? (
                  <Sun className="h-5 w-5 mr-2" />
                ) : (
                  <Moon className="h-5 w-5 mr-2" />
                )}
                {highContrast ? 'Standard Contrast' : 'High Contrast'}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div 
            ref={contentRef}
            className={`rounded-xl shadow-sm border p-6 relative overflow-hidden ${
              highContrast 
                ? 'border-white/20 bg-gray-900' 
                : 'border-gray-200 bg-white'
            }`}
            style={{
              filter: `contrast(${contrast}) brightness(${brightness}) blur(${calculateBlur()}px)`,
              transform: calculateCorrectionTransform(),
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: calculateVignette(),
                mixBlendMode: 'multiply',
              }}
            />

            <h2 className={`text-2xl font-semibold mb-6 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              Vision Simulation
            </h2>

            <div className="space-y-6">
              {images.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`p-4 ${highContrast ? 'bg-black/80' : 'bg-white/80'}`}>
                    <h3 className={`font-medium ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                      {image.title}
                    </h3>
                    <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}

              <div 
                className="prose max-w-none"
                style={{ fontSize: `${fontSize}px` }}
              >
                {sampleText.split('\n').map((paragraph, index) => (
                  <p 
                    key={index} 
                    className={`mb-4 ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision Information */}
        <div className={`mt-12 rounded-xl shadow-sm border p-6 ${
          highContrast ? 'border-white/20 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Understanding Vision Correction
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Spherical Power',
                description: 'Corrects nearsightedness (negative) or farsightedness (positive)',
                icon: Focus,
              },
              {
                title: 'Astigmatism',
                description: 'Corrects irregular cornea shape causing distorted vision',
                icon: Crosshair,
              },
              {
                title: 'Viewing Distance',
                description: 'Affects how vision problems manifest at different distances',
                icon: ZoomIn,
              },
            ].map((info, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 ${
                  highContrast 
                    ? 'bg-gray-800 border border-white/10' 
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center mb-2">
                  <info.icon className={`h-5 w-5 mr-2 ${
                    highContrast ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-medium ${
                    highContrast ? 'text-white' : 'text-gray-900'
                  }`}>
                    {info.title}
                  </h3>
                </div>
                <p className={`text-sm ${
                  highContrast ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowVisionPage;