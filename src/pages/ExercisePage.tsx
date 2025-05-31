import React, { useState, useRef, useEffect } from 'react';
import { Eye, Target, Crosshair, Focus, Brain, Timer } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'amblyopia' | 'convergence' | 'strabismus' | 'accommodation';
  instructions: string[];
}

const exercises: Exercise[] = [
  {
    id: 'pencil-push',
    title: 'Pencil Push-ups',
    description: 'Improves eye convergence and coordination',
    duration: 300,
    type: 'convergence',
    instructions: [
      'Hold a pencil at arm\'s length',
      'Focus on the tip of the pencil',
      'Slowly bring the pencil closer to your nose',
      'Stop when you see double vision',
      'Hold for 5 seconds, then return to starting position'
    ]
  },
  {
    id: 'focus-shift',
    title: 'Near-Far Focus Shifts',
    description: 'Strengthens accommodation and reduces eye strain',
    duration: 180,
    type: 'accommodation',
    instructions: [
      'Hold text at reading distance',
      'Focus on the text for 10 seconds',
      'Look at a distant object for 10 seconds',
      'Repeat the cycle'
    ]
  },
  {
    id: 'tracking',
    title: 'Eye Tracking',
    description: 'Improves visual tracking and eye movement control',
    duration: 240,
    type: 'amblyopia',
    instructions: [
      'Follow the moving target with your eyes',
      'Keep your head still',
      'Blink normally',
      'Stop if you feel eye strain'
    ]
  },
  {
    id: 'fusion',
    title: 'Fusion Training',
    description: 'Helps align eyes and improve binocular vision',
    duration: 300,
    type: 'strabismus',
    instructions: [
      'Focus on the central target',
      'Try to maintain single vision',
      'Adjust distance if needed',
      'Practice gentle convergence'
    ]
  }
];

const ExercisePage: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isExercising, setIsExercising] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isExercising && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsExercising(false);
    }
  }, [isExercising, timeLeft]);

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setTimeLeft(exercise.duration);
    setIsExercising(true);
    if (exercise.type === 'amblyopia') {
      animateTarget();
    }
  };

  const animateTarget = () => {
    if (!targetRef.current) return;
    
    let startTime = performance.now();
    const duration = 2000; // 2 seconds per cycle
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      
      if (targetRef.current) {
        const radius = 100; // Radius of circular motion
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

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Vision Therapy Exercises
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive exercises designed to improve visual function and eye coordination.
            Always consult with an eye care professional before starting vision therapy.
          </p>
        </div>

        {selectedExercise && isExercising ? (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedExercise.title}</h2>
              <p className="text-gray-600">{selectedExercise.description}</p>
              <div className="mt-4 text-3xl font-mono text-primary-600">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="relative h-64 flex items-center justify-center bg-gray-50 rounded-lg mb-8">
              {selectedExercise.type === 'amblyopia' && (
                <div
                  ref={targetRef}
                  className="absolute w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white"
                >
                  <Target className="w-6 h-6" />
                </div>
              )}
              {selectedExercise.type === 'convergence' && (
                <div className="text-primary-600">
                  <Crosshair className="w-12 h-12 animate-pulse" />
                </div>
              )}
              {selectedExercise.type === 'strabismus' && (
                <div className="space-x-16 flex items-center">
                  <div className="w-4 h-4 bg-primary-600 rounded-full" />
                  <div className="w-6 h-6 bg-primary-400 rounded-full animate-pulse" />
                  <div className="w-4 h-4 bg-primary-600 rounded-full" />
                </div>
              )}
              {selectedExercise.type === 'accommodation' && (
                <div className="space-y-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">Focus Here</div>
                  <div className="text-sm text-gray-500">Then look at a distant object</div>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-8">
              {selectedExercise.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-700 bg-gray-50 p-3 rounded"
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-3 text-sm">
                    {index + 1}
                  </span>
                  {instruction}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsExercising(false)}
              className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              Stop Exercise
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {exercise.type === 'amblyopia' && <Eye className="h-6 w-6 text-primary-600 mr-2" />}
                  {exercise.type === 'convergence' && <Target className="h-6 w-6 text-primary-600 mr-2" />}
                  {exercise.type === 'strabismus' && <Focus className="h-6 w-6 text-primary-600 mr-2" />}
                  {exercise.type === 'accommodation' && <Brain className="h-6 w-6 text-primary-600 mr-2" />}
                  <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Timer className="h-4 w-4 mr-1" />
                    {formatTime(exercise.duration)}
                  </div>
                  <button
                    onClick={() => startExercise(exercise)}
                    className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                  >
                    Start Exercise
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Important Notes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Consult a Professional',
                description: 'These exercises are not a substitute for professional medical advice. Always consult an eye care specialist.',
              },
              {
                title: 'Take Breaks',
                description: 'Stop if you experience eye strain, headaches, or discomfort. Rest between exercises.',
              },
              {
                title: 'Regular Practice',
                description: 'Consistency is key. Regular practice as recommended by your eye care provider yields best results.',
              },
            ].map((note, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <h3 className="font-medium text-gray-900 mb-2">{note.title}</h3>
                <p className="text-sm text-gray-600">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;