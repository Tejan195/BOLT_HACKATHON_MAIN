import React, { useState, useEffect, useRef } from 'react';
import { Eye, ZoomIn, Focus, Glasses, Sparkles, Dumbbell, Target, ArrowUpDown, Crosshair } from 'lucide-react';

const RefractiveErrorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'exercises'>('simulation');
  const [visionType, setVisionType] = useState<'myopia' | 'hyperopia' | 'astigmatism' | 'presbyopia' | null>(null);
  const [severity, setSeverity] = useState(0);
  const [textSize, setTextSize] = useState(16);
  const [distanceMode, setDistanceMode] = useState<'near' | 'far'>('near');
  const [correction, setCorrection] = useState(false);
  const [exerciseType, setExerciseType] = useState<'amblyopia' | 'convergence' | 'strabismus' | 'accommodation' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const exerciseCanvasRef = useRef<HTMLCanvasElement>(null);

  const sampleText = `
    This is a sample text to demonstrate how refractive error correction works.
    Adjust the settings to simulate different vision conditions and see how
    correction can improve visibility. The text adjusts based on your selected
    viewing distance and correction preferences.

    People with refractive errors may experience difficulty reading text at various
    distances. This simulation helps understand how different conditions affect
    vision and how corrective measures can help improve visual clarity.
  `;

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

  const applyPreDistortion = (ctx: CanvasRenderingContext2D, matrix: any) => {
    const { width, height } = ctx.canvas;
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((matrix.rotation * Math.PI) / 180);
    ctx.scale(matrix.scale.x, matrix.scale.y);
    ctx.translate(-width / 2, -height / 2);
  };

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current || !visionType) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!correction) {
      const matrix = calculateDistortionMatrix(visionType, severity, distanceMode);
      applyPreDistortion(ctx, matrix);
      ctx.filter = `blur(${matrix.blur}px) brightness(${matrix.brightness}) contrast(${matrix.contrast})`;
    }

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

  const exercises = {
    amblyopia: {
      title: 'Amblyopia (Lazy Eye) Exercises',
      description: 'Interactive exercises to strengthen the weaker eye and improve coordination.',
      instructions: [
        'Cover your stronger eye with an eye patch',
        'Follow the moving target with your weaker eye',
        'Try to maintain focus on the target',
        'Practice for 15-20 minutes daily'
      ]
    },
    convergence: {
      title: 'Convergence Insufficiency Training',
      description: 'Exercises to improve eye coordination and focusing ability.',
      instructions: [
        'Hold a small target at arm's length',
        'Slowly bring it closer while maintaining focus',
        'Stop if you see double vision',
        'Repeat 10 times per session'
      ]
    },
    strabismus: {
      title: 'Strabismus (Eye Turn) Therapy',
      description: 'Activities to help align eyes and strengthen eye muscles.',
      instructions: [
        'Focus on a stationary target',
        'Practice switching focus between near and far objects',
        'Perform eye tracking exercises',
        'Do pencil push-ups'
      ]
    },
    accommodation: {
      title: 'Accommodative Training',
      description: 'Exercises to improve focusing flexibility and reduce eye strain.',
      instructions: [
        'Alternate focus between near and far targets',
        'Practice rapid focus changes',
        'Use focus cards with different sizes',
        'Take frequent breaks'
      ]
    }
  };

  const startExercise = (type: keyof typeof exercises) => {
    setExerciseType(type);
    const canvas = exerciseCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (type) {
      case 'amblyopia':
        drawAmblyopiaExercise(ctx);
        break;
      case 'convergence':
        drawConvergenceExercise(ctx);
        break;
      case 'strabismus':
        drawStrabismusExercise(ctx);
        break;
      case 'accommodation':
        drawAccommodationExercise(ctx);
        break;
    }
  };

  const drawAmblyopiaExercise = (ctx: CanvasRenderingContext2D) => {
    const target = { x: 150, y: 150, radius: 10 };
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, 300, 300);
      target.x = 150 + Math.cos(angle) * 50;
      target.y = 150 + Math.sin(angle) * 50;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();
      angle += 0.02;
      requestAnimationFrame(animate);
    };

    animate();
  };

  const drawConvergenceExercise = (ctx: CanvasRenderingContext2D) => {
    let distance = 150;
    let growing = false;

    const animate = () => {
      ctx.clearRect(0, 0, 300, 300);
      ctx.beginPath();
      ctx.arc(150, distance, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();
      
      if (growing) {
        distance += 1;
        if (distance >= 250) growing = false;
      } else {
        distance -= 1;
        if (distance <= 50) growing = true;
      }
      
      requestAnimationFrame(animate);
    };

    animate();
  };

  const drawStrabismusExercise = (ctx: CanvasRenderingContext2D) => {
    let x = 150;
    let direction = 1;

    const animate = () => {
      ctx.clearRect(0, 0, 300, 300);
      ctx.beginPath();
      ctx.arc(x, 150, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();
      
      x += direction * 2;
      if (x >= 280 || x <= 20) direction *= -1;
      
      requestAnimationFrame(animate);
    };

    animate();
  };

  const drawAccommodationExercise = (ctx: CanvasRenderingContext2D) => {
    let size = 20;
    let growing = false;

    const animate = () => {
      ctx.clearRect(0, 0, 300, 300);
      ctx.beginPath();
      ctx.arc(150, 150, size, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();
      
      if (growing) {
        size += 0.5;
        if (size >= 40) growing = false;
      } else {
        size -= 0.5;
        if (size <= 10) growing = true;
      }
      
      requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Vision Support & Therapy
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience vision simulations and practice therapeutic exercises designed to improve various vision conditions.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'simulation'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Vision Simulation
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'exercises'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Vision Exercises
            </button>
          </div>
        </div>

        {activeTab === 'simulation' ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Eye className="h-6 w-6 text-primary-600 mr-2" />
                Vision Settings
              </h2>

              <div className="space-y-6">
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vision Simulation</h2>
              
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
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Dumbbell className="h-6 w-6 text-primary-600 mr-2" />
                Vision Exercises
              </h2>

              <div className="grid gap-4">
                {Object.entries(exercises).map(([key, exercise]) => (
                  <button
                    key={key}
                    onClick={() => startExercise(key as keyof typeof exercises)}
                    className={`p-4 rounded-lg text-left transition-all duration-300 ${
                      exerciseType === key
                        ? 'bg-primary-100 border-2 border-primary-500'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{exercise.title}</h3>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {exerciseType ? (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    {exercises[exerciseType].title}
                  </h2>
                  
                  <div className="mb-6">
                    <canvas
                      ref={exerciseCanvasRef}
                      width={300}
                      height={300}
                      className="bg-gray-50 rounded-lg mx-auto"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Instructions:</h3>
                    <ul className="space-y-2">
                      {exercises[exerciseType].instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm mr-2">
                            {index + 1}
                          </span>
                          <span className="text-gray-600">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select an exercise to begin</p>
                </div>
              )}
            </div>
          </div>
        )}

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