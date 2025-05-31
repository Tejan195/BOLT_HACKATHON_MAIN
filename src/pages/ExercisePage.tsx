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
    const duration = 2000;
    
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
                <div className="space-x-24 flex items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full animate-pulse" />
                  <div 
                    onClick={handleTargetClick}
                    className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Crosshair className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-primary-500 rounded-full animate-pulse" />
                </div>
              )}
              {selectedExercise.type === 'strabismus' && (
                <div className="relative">
                  <div className="absolute -left-16 top-0 w-8 h-8 bg-primary-500 rounded-full" />
                  <div 
                    onClick={handleTargetClick}
                    className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Focus className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -right-16 top-0 w-8 h-8 bg-primary-500 rounded-full" />
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