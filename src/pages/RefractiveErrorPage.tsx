import React, { useState, useEffect, useRef } from 'react';
import { Eye, ZoomIn, Focus, Glasses, Sparkles } from 'lucide-react';

const RefractiveErrorPage: React.FC = () => {
  const [visionType, setVisionType] = useState<'myopia' | 'hyperopia' | 'astigmatism' | 'presbyopia' | null>(null);
  const [severity, setSeverity] = useState(0);
  const [textSize, setTextSize] = useState(16);
  const [distanceMode, setDistanceMode] = useState<'near' | 'far'>('near');
  const [correction, setCorrection] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const sampleText = `
    This is a sample text to demonstrate how refractive error correction works.
    Adjust the settings to simulate different vision conditions and see how
    correction can improve visibility. The text adjusts based on your selected
    viewing distance and correction preferences.

    People with refractive errors may experience difficulty reading text at various
    distances. This simulation helps understand how different conditions affect
    vision and how corrective measures can help improve visual clarity.
  `;

  // Pre-distortion matrix calculations
  const calculateDistortionMatrix = (type: string, severity: number, distance: 'near' | 'far') => {
    const base = severity / 10;
    const matrix = {
      scale: { x: 1, y: 1 },
      rotation: 0,
      blur: 0,
      brightness: 1,
      contrast: 1
    };

    switch (type) {
      case 'myopia':
        if (distance === 'far') {
          matrix.scale.x = 1 - base * 0.15;
          matrix.scale.y = 1 - base * 0.15;
          matrix.blur = base * 8;
          matrix.brightness = 1 - base * 0.2;
        }
        break;
      case 'hyperopia':
        if (distance === 'near') {
          matrix.scale.x = 1 + base * 0.15;
          matrix.scale.y = 1 + base * 0.15;
          matrix.blur = base * 8;
          matrix.brightness = 1 - base * 0.2;
        }
        break;
      case 'astigmatism':
        matrix.scale.x = 1 + base * 0.2;
        matrix.scale.y = 1 - base * 0.2;
        matrix.rotation = base * 15;
        matrix.blur = base * 6;
        break;
      case 'presbyopia':
        if (distance === 'near') {
          matrix.scale.x = 1 - base * 0.1;
          matrix.scale.y = 1 - base * 0.1;
          matrix.blur = base * 7;
          matrix.brightness = 1 - base * 0.15;
          matrix.contrast = 1 - base * 0.2;
        }
        break;
    }

    return matrix;
  };

  // Apply pre-distortion to canvas
  const applyPreDistortion = (ctx: CanvasRenderingContext2D, matrix: any) => {
    const { width, height } = ctx.canvas;
    ctx.save();
    
    // Center transform
    ctx.translate(width / 2, height / 2);
    
    // Apply distortion
    ctx.rotate((matrix.rotation * Math.PI) / 180);
    ctx.scale(matrix.scale.x, matrix.scale.y);
    
    // Return to original position
    ctx.translate(-width / 2, -height / 2);
  };

  // Update canvas when parameters change
  useEffect(() => {
    if (!canvasRef.current || !imageRef.current || !visionType) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!correction) {
      const matrix = calculateDistortionMatrix(visionType, severity, distanceMode);
      applyPreDistortion(ctx, matrix);
      
      // Apply blur and other effects
      ctx.filter = `blur(${matrix.blur}px) brightness(${matrix.brightness}) contrast(${matrix.contrast})`;
    }

    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  }, [visionType, severity, distanceMode, correction]);

  const getTextStyle = () => {
    if (correction || !visionType) return {};

    const matrix = calculateDistortionMatrix(visionType, severity, distanceMode);
    const transform = `
      scale(${matrix.scale.x}, ${matrix.scale.y})
      rotate(${matrix.rotation}deg)
    `;

    return {
      transform,
      filter: `blur(${matrix.blur}px) brightness(${matrix.brightness}) contrast(${matrix.contrast})`,
      transition: 'all 0.3s ease-in-out',
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Refractive Error Support
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience and understand different refractive errors with our interactive simulator.
            Select a vision condition to see its effects on text and images.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Eye className="h-6 w-6 text-primary-600 mr-2" />
              Vision Settings
            </h2>

            <div className="space-y-6">
              {/* Vision Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Condition
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'myopia', label: 'Myopia (Nearsightedness)' },
                    { type: 'hyperopia', label: 'Hyperopia (Farsightedness)' },
                    { type: 'astigmatism', label: 'Astigmatism' },
                    { type: 'presbyopia', label: 'Presbyopia' },
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setVisionType(option.type as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        visionType === option.type
                          ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Level */}
              {visionType && (
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Focus className="h-4 w-4 mr-2" />
                    Condition Severity: {Math.round((severity / 10) * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={severity}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                </div>
              )}

              {/* Text Size */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Text Size: {textSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Viewing Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Viewing Distance
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDistanceMode('near')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      distanceMode === 'near'
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    Near Vision
                  </button>
                  <button
                    onClick={() => setDistanceMode('far')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      distanceMode === 'far'
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    Far Vision
                  </button>
                </div>
              </div>

              {/* Correction Toggle */}
              {visionType && (
                <button
                  onClick={() => setCorrection(!correction)}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    correction
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Glasses className="h-5 w-5 mr-2" />
                  {correction ? 'Remove Correction' : 'Apply Correction'}
                </button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vision Simulation</h2>
            
            {/* Image Preview with Canvas */}
            <div className="mb-6 rounded-lg overflow-hidden relative">
              <img
                ref={imageRef}
                src="https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1280"
                alt="Vision test scene"
                className="hidden"
                onLoad={() => {
                  if (canvasRef.current && imageRef.current) {
                    canvasRef.current.width = imageRef.current.width;
                    canvasRef.current.height = imageRef.current.height;
                  }
                }}
              />
              <canvas
                ref={canvasRef}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Text Preview */}
            <div
              className="prose max-w-none"
              style={{
                ...getTextStyle(),
                fontSize: `${textSize}px`,
              }}
            >
              {sampleText.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Myopia (Nearsightedness)',
              description: 'Distant objects appear blurry while near objects remain clear. Common in children and young adults.',
              icon: Eye,
            },
            {
              title: 'Hyperopia (Farsightedness)',
              description: 'Near objects appear blurry while distant objects remain clear. May cause eye strain during close work.',
              icon: ZoomIn,
            },
            {
              title: 'Astigmatism',
              description: 'Objects appear stretched or distorted due to irregular cornea shape. Can occur with other conditions.',
              icon: Focus,
            },
            {
              title: 'Presbyopia',
              description: 'Age-related difficulty focusing on near objects, typically developing after age 40.',
              icon: Glasses,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <card.icon className="h-6 w-6 text-primary-600 mr-2" />
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
            Vision Care Tips
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Regular Eye Exams',
                description: 'Schedule comprehensive eye exams to monitor vision changes and update prescriptions as needed.',
              },
              {
                title: 'Digital Eye Strain',
                description: 'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
              },
              {
                title: 'Proper Lighting',
                description: 'Ensure adequate lighting for reading and close work to reduce eye strain and fatigue.',
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-gray-100 transition-colors duration-300"
              >
                <h3 className="font-medium text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefractiveErrorPage;