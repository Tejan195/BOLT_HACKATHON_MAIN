import React, { useState, useEffect, useRef } from 'react';
import { Eye, ZoomIn, Focus, Glasses, Sparkles, ArrowLeft, Brain, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VisionCorrection } from '../components/vision/VisionCorrection';

const RefractiveErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [visionType, setVisionType] = useState<'myopia' | 'hyperopia' | 'astigmatism' | 'presbyopia' | null>(null);
  const [severity, setSeverity] = useState(0);
  const [textSize, setTextSize] = useState(16);
  const [distanceMode, setDistanceMode] = useState<'near' | 'far'>('near');
  const [correction, setCorrection] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);

  const sampleText = `
    This is a sample text to demonstrate how refractive error correction works.
    Adjust the settings to simulate different vision conditions and see how
    correction can improve visibility. The text adjusts based on your selected
    viewing distance and correction preferences.

    People with refractive errors may experience difficulty reading text at various
    distances. This simulation helps understand how different conditions affect
    vision and how corrective measures can help improve visual clarity.
  `;

  const images = [
    {
      url: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1280',
      title: 'City Scene',
      description: 'Urban landscape with varying depths and details'
    },
    {
      url: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1280',
      title: 'Reading Material',
      description: 'Text at different distances and sizes'
    },
    {
      url: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1280',
      title: 'Street Signs',
      description: 'Various signs and text at different distances'
    }
  ];

  const calculateBlur = () => {
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

  const calculateDistortion = () => {
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

  const startExercise = () => {
    setShowExercise(true);
    setScore(0);
    moveTarget();
  };

  const moveTarget = () => {
    if (!targetRef.current) return;
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setTargetPosition({ x: newX, y: newY });
  };

  const handleTargetClick = () => {
    setScore(prev => prev + 10);
    moveTarget();
  };

  useEffect(() => {
    if (showExercise) {
      const interval = setInterval(moveTarget, 2000);
      return () => clearInterval(interval);
    }
  }, [showExercise]);

  const getVisionTypeDescription = () => {
    switch (visionType) {
      case 'myopia':
        return {
          title: 'Myopia (Nearsightedness)',
          description: 'Objects far away appear blurry while near objects remain clear.',
          exercise: 'Focus on distant objects and gradually bring them closer.'
        };
      case 'hyperopia':
        return {
          title: 'Hyperopia (Farsightedness)',
          description: 'Near objects appear blurry while distant objects remain clear.',
          exercise: 'Practice focusing on close objects at varying distances.'
        };
      case 'astigmatism':
        return {
          title: 'Astigmatism',
          description: 'Objects appear stretched or distorted due to irregular cornea shape.',
          exercise: 'Follow moving objects while maintaining clear focus.'
        };
      case 'presbyopia':
        return {
          title: 'Presbyopia',
          description: 'Age-related difficulty focusing on near objects.',
          exercise: 'Practice switching focus between near and far objects.'
        };
      default:
        return {
          title: 'Select a Vision Type',
          description: 'Choose a refractive error type to begin simulation.',
          exercise: ''
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Advanced Vision Simulation
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience and understand different refractive errors with our interactive simulator.
            Includes realistic vision effects and corrective exercises.
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
                      onClick={() => {
                        setVisionType(option.type as any);
                        setShowExercise(false);
                      }}
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

              {/* Vision Exercise Button */}
              {visionType && !showExercise && (
                <button
                  onClick={startExercise}
                  className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-accent-500 text-white hover:bg-accent-600 transition-all duration-300"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Start Vision Exercise
                </button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {getVisionTypeDescription().title}
              </h2>
              <p className="text-gray-600">
                {getVisionTypeDescription().description}
              </p>
            </div>

            {showExercise ? (
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl text-gray-500">Score: {score}</div>
                </div>
                <div
                  ref={targetRef}
                  className="absolute w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${targetPosition.x}px`,
                    top: `${targetPosition.y}px`,
                    transform: calculateDistortion(),
                    filter: `blur(${calculateBlur()}px)`,
                  }}
                  onClick={handleTargetClick}
                >
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
            ) : (
              <VisionCorrection
                visionType={visionType}
                severity={severity}
                correction={correction}
                distanceMode={distanceMode}
              >
                {/* Image Preview */}
                <div className="mb-6 space-y-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-center p-4">
                          <h3 className="text-lg font-semibold">{image.title}</h3>
                          <p className="text-sm">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Text Preview */}
                <div className="prose max-w-none" style={{ fontSize: `${textSize}px` }}>
                  {sampleText.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </VisionCorrection>
            )}
          </div>
        </div>

        {/* Exercise Instructions */}
        {visionType && getVisionTypeDescription().exercise && (
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
              Vision Exercise Instructions
            </h2>
            <p className="text-gray-600 mb-4">{getVisionTypeDescription().exercise}</p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Duration</h3>
                <p className="text-sm text-gray-600">Practice for 5-10 minutes, 2-3 times daily</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Distance</h3>
                <p className="text-sm text-gray-600">Start at comfortable distance, gradually increase challenge</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Progress</h3>
                <p className="text-sm text-gray-600">Track improvements in clarity and focus time</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefractiveErrorPage;