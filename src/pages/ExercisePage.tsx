import React, { useState, useRef, useEffect } from 'react';
import { Eye, Target, Crosshair, Focus, Brain, Timer, Trophy, Star, Award } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'amblyopia' | 'convergence' | 'strabismus' | 'accommodation';
  instructions: string[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const exercises: Exercise[] = [
  {
    id: 'pencil-push',
    title: 'Eye Convergence Challenge',
    description: 'Guide the target to improve eye coordination',
    duration: 300,
    type: 'convergence',
    points: 100,
    difficulty: 'medium',
    instructions: [
      'Follow the moving target with both eyes',
      'Keep your head still and maintain focus',
      'Click when targets align',
      'Score points for accurate timing'
    ]
  },
  {
    id: 'focus-shift',
    title: 'Focus Master',
    description: 'Test your focusing speed and accuracy',
    duration: 180,
    type: 'accommodation',
    points: 150,
    difficulty: 'hard',
    instructions: [
      'Click targets as they appear',
      'Switch between near and far focus',
      'Maintain accuracy for combo points',
      'Beat your high score!'
    ]
  },
  {
    id: 'tracking',
    title: 'Target Tracker',
    description: 'Track moving targets to strengthen eye muscles',
    duration: 240,
    type: 'amblyopia',
    points: 75,
    difficulty: 'easy',
    instructions: [
      'Follow the bouncing target',
      'Click when it changes color',
      'Chain successful hits',
      'Avoid distractions'
    ]
  },
  {
    id: 'fusion',
    title: 'Vision Fusion Quest',
    description: 'Merge split images into one clear view',
    duration: 300,
    type: 'strabismus',
    points: 125,
    difficulty: 'medium',
    instructions: [
      'Align the split targets',
      'Maintain fusion for points',
      'Progress through levels',
      'Beat time challenges'
    ]
  }
];

const ExercisePage: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isExercising, setIsExercising] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState<Record<string, number>>({});
  const [convergencePos, setConvergencePos] = useState(0); // -1 (left) to 1 (right), 0 is center
  const [isAligned, setIsAligned] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [fusionOffset, setFusionOffset] = useState(80); // px offset from center
  const [isFused, setIsFused] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const savedScores = localStorage.getItem('exerciseHighScores');
    if (savedScores) {
      setHighScore(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    if (isExercising && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && selectedExercise) {
      endExercise();
    }
  }, [isExercising, timeLeft]);

  useEffect(() => {
    if (selectedExercise?.type === 'convergence' && isExercising) {
      animateConvergenceTarget();
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
    // eslint-disable-next-line
  }, [selectedExercise, isExercising]);

  useEffect(() => {
    if (selectedExercise?.type === 'amblyopia' && isExercising) {
      animateTarget();
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
    // eslint-disable-next-line
  }, [selectedExercise, isExercising]);

  useEffect(() => {
    if (selectedExercise?.type === 'strabismus' && isExercising) {
      let startTime = performance.now();
      const duration = 2000; // 2 seconds for a full cycle

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = (elapsed % duration) / duration;
        // Offset oscillates from 80px to 0px and back
        const offset = 80 * Math.abs(Math.sin(progress * Math.PI));
        setFusionOffset(offset);
        setIsFused(offset < 18); // Consider fused if close

        if (isExercising && selectedExercise?.type === 'strabismus') {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
    // eslint-disable-next-line
  }, [selectedExercise, isExercising]);

  useEffect(() => {
    if (!isExercising && targetRef.current) {
      targetRef.current.style.transform = '';
    }
  }, [isExercising]);

  const endExercise = () => {
    setIsExercising(false);
    if (selectedExercise && score > (highScore[selectedExercise.id] || 0)) {
      const newHighScores = { ...highScore, [selectedExercise.id]: score };
      setHighScore(newHighScores);
      localStorage.setItem('exerciseHighScores', JSON.stringify(newHighScores));
    }
  };

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setTimeLeft(exercise.duration);
    setScore(0);
    setCombo(0);
    setIsExercising(true);
    if (exercise.type === 'amblyopia') {
      animateTarget();
    }
  };

  const handleTargetClick = () => {
    if (!selectedExercise) return;

    const now = Date.now();
    if (now - lastClickTime < 300) return; // 300ms cooldown
    setLastClickTime(now);

    setScore(prev => prev + selectedExercise.points * (1 + combo * 0.1));
    setCombo(prev => prev + 1);

    // Visual feedback
    if (targetRef.current) {
      targetRef.current.classList.add('scale-125', 'bg-green-500');
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.classList.remove('scale-125', 'bg-green-500');
        }
      }, 200);
    }
  };

  const animateTarget = () => {
    if (!targetRef.current || !gameAreaRef.current) return;

    let startTime = performance.now();
    const duration = 1000; // Faster: 1 second per circle

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;

      if (targetRef.current && gameAreaRef.current) {
        const areaRect = gameAreaRef.current.getBoundingClientRect();
        const radius = Math.min(areaRect.width, areaRect.height) * 0.3;
        const x = Math.cos(progress * Math.PI * 2) * radius;
        const y = Math.sin(progress * Math.PI * 2) * radius;

        targetRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      if (isExercising) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const animateConvergenceTarget = () => {
    if (!isExercising || selectedExercise?.type !== 'convergence') return;

    let startTime = performance.now();
    const duration = 2000; // 2 seconds for a full left-right-left cycle

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      // Move from left (-1) to right (1) and back (sinusoidal motion)
      const progress = (elapsed % duration) / duration;
      const pos = Math.sin(progress * Math.PI * 2); // -1 to 1
      setConvergencePos(pos);

      // Consider "aligned" if close to center
      setIsAligned(Math.abs(pos) < 0.18); // Slightly easier to click

      if (isExercising && selectedExercise?.type === 'convergence') {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleConvergenceClick = () => {
    if (!selectedExercise) return;
    if (!isAligned) return; // Only score if aligned

    const now = Date.now();
    if (now - lastClickTime < 400) return; // 400ms cooldown for fairness
    setLastClickTime(now);

    setScore(prev => prev + selectedExercise.points * (1 + combo * 0.1));
    setCombo(prev => prev + 1);

    // Visual feedback
    if (targetRef.current) {
      targetRef.current.classList.add('scale-125', 'bg-green-500');
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.classList.remove('scale-125', 'bg-green-500');
        }
      }, 200);
    }
  };

  const handleFusionClick = () => {
    if (!selectedExercise) return;
    if (!isFused) return; // Only score if fused

    const now = Date.now();
    if (now - lastClickTime < 400) return; // Cooldown
    setLastClickTime(now);

    setScore(prev => prev + selectedExercise.points * (1 + combo * 0.1));
    setCombo(prev => prev + 1);

    // Visual feedback
    if (targetRef.current) {
      targetRef.current.classList.add('scale-125', 'bg-green-500');
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.classList.remove('scale-125', 'bg-green-500');
        }
      }, 200);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Vision Training Arena
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Level up your vision with interactive exercises. Complete challenges, earn points,
            and track your progress!
          </p>
        </div>

        {selectedExercise?.type === 'convergence' && isExercising && (
          <div className="mb-6 p-4 bg-gray-900/60 border-l-4 border-blue-400 rounded text-blue-100">
            <h3 className="font-bold mb-1">How to Play: Eye Convergence Challenge</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Watch the central target move left and right between the two side dots.</li>
              <li>When the central target glows yellow (aligned in the center), <b>click it</b> to score points.</li>
              <li>Each successful click increases your score and combo multiplier.</li>
              <li>Try to score as many points as possible before time runs out!</li>
            </ul>
          </div>
        )}

        {selectedExercise?.type === 'amblyopia' && isExercising && (
          <div className="mb-6 p-4 bg-gray-900/60 border-l-4 border-blue-400 rounded text-blue-100">
            <h3 className="font-bold mb-1">How to Play: Target Tracker</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Watch the target move in a circular path.</li>
              <li>Click the target as it moves to score points.</li>
              <li>Each successful click increases your score and combo multiplier.</li>
              <li>Try to score as many points as possible before time runs out!</li>
            </ul>
          </div>
        )}

        {selectedExercise && isExercising ? (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedExercise.title}</h2>
                <p className="text-gray-400">{selectedExercise.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono text-primary-400 mb-2">{formatTime(timeLeft)}</div>
                <div className="text-2xl font-bold text-primary-300">Score: {Math.floor(score)}</div>
                {combo > 1 && (
                  <div className="text-yellow-400 animate-pulse">
                    {combo}x Combo!
                  </div>
                )}
              </div>
            </div>

            <div 
              ref={gameAreaRef}
              className="relative h-96 flex items-center justify-center bg-gray-900 rounded-lg mb-8 overflow-hidden"
            >
              {selectedExercise.type === 'amblyopia' && (
                <div
                  ref={targetRef}
                  onClick={handleTargetClick}
                  className="absolute w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-200 hover:scale-110"
                >
                  <Target className="w-8 h-8" />
                </div>
              )}
              {selectedExercise.type === 'convergence' && (
                <div className="space-x-24 flex items-center relative w-full h-24 justify-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full animate-pulse" />
                  <div
                    ref={targetRef}
                    onClick={handleConvergenceClick}
                    className={`w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center cursor-pointer transition-transform absolute`}
                    style={{
                      left: `calc(50% + ${convergencePos * 120}px - 1.5rem)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      boxShadow: isAligned ? '0 0 0 6px #facc15' : undefined, // yellow glow when aligned
                      zIndex: 10,
                    }}
                  >
                    <Crosshair className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-primary-500 rounded-full animate-pulse" />
                </div>
              )}
              {selectedExercise.type === 'strabismus' && (
                <div className="relative w-full h-32 flex items-center justify-center">
                  <div
                    className="absolute"
                    style={{
                      left: `calc(50% - ${fusionOffset + 32}px)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      transition: 'left 0.1s',
                    }}
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full" />
                  </div>
                  <div
                    ref={targetRef}
                    onClick={handleFusionClick}
                    className="absolute cursor-pointer flex items-center justify-center"
                    style={{
                      left: 'calc(50% - 1.5rem)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      boxShadow: isFused ? '0 0 0 6px #facc15' : undefined, // yellow glow when fused
                      transition: 'box-shadow 0.1s',
                    }}
                  >
                    <Focus className="w-12 h-12 text-white bg-primary-400 rounded-full" />
                  </div>
                  <div
                    className="absolute"
                    style={{
                      left: `calc(50% + ${fusionOffset}px)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      transition: 'left 0.1s',
                    }}
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full" />
                  </div>
                </div>
              )}
              {selectedExercise.type === 'accommodation' && (
                <div 
                  onClick={handleTargetClick}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  <div className="text-4xl font-bold text-primary-400 animate-bounce">
                    Focus Here
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">High Score</h3>
                <p className="text-2xl text-primary-300">
                  {Math.floor(highScore[selectedExercise.id] || 0)}
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Current Level</h3>
                <p className="text-2xl text-primary-300">
                  {Math.floor(score / 1000) + 1}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExercising(false)}
              className="w-full bg-red-900 text-red-100 py-3 rounded-lg hover:bg-red-800 transition-colors"
            >
              End Exercise
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:border-primary-500 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {exercise.type === 'amblyopia' && <Eye className="h-6 w-6 text-primary-400 mr-2" />}
                    {exercise.type === 'convergence' && <Target className="h-6 w-6 text-primary-400 mr-2" />}
                    {exercise.type === 'strabismus' && <Focus className="h-6 w-6 text-primary-400 mr-2" />}
                    {exercise.type === 'accommodation' && <Brain className="h-6 w-6 text-primary-400 mr-2" />}
                    <h3 className="text-lg font-semibold text-white">{exercise.title}</h3>
                  </div>
                  <div className={`text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty.toUpperCase()}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{exercise.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Timer className="h-4 w-4 mr-1" />
                      {formatTime(exercise.duration)}
                    </div>
                    <div className="flex items-center text-sm text-yellow-400">
                      <Trophy className="h-4 w-4 mr-1" />
                      {exercise.points} pts
                    </div>
                  </div>
                  {highScore[exercise.id] && (
                    <div className="flex items-center text-sm text-primary-400">
                      <Star className="h-4 w-4 mr-1" />
                      Best: {Math.floor(highScore[exercise.id])}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => startExercise(exercise)}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <Award className="h-5 w-5" />
                  <span>Start Challenge</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Training Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Take Regular Breaks',
                description: 'Rest your eyes between exercises. Stop if you experience discomfort.',
              },
              {
                title: 'Stay Consistent',
                description: 'Regular practice yields better results. Try to maintain a daily routine.',
              },
              {
                title: 'Professional Guidance',
                description: 'These exercises work best when supervised by an eye care specialist.',
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-medium text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-400">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;