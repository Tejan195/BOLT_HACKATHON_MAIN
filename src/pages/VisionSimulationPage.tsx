import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, Wand2, ArrowLeft } from 'lucide-react';
import { useVisionStore } from '../store/useVisionStore';
import { ColorVisionType } from '../types';

const simulationContent = {
  protanopia: {
    title: 'Protanopia Simulation',
    description: 'Experience how individuals with protanopia see the world. This condition affects the ability to perceive red colors.',
    images: [
      {
        url: 'https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Nature Landscape',
        description: 'Mountain landscape with vibrant red and orange sunset colors'
      },
      {
        url: 'https://images.pexels.com/photos/1154198/pexels-photo-1154198.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Autumn Forest',
        description: 'Forest with red and green fall foliage'
      },
      {
        url: 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Traffic Lights',
        description: 'Urban scene with traffic signals and red signs'
      }
    ]
  },
  deuteranopia: {
    title: 'Deuteranopia Simulation',
    description: 'See through the eyes of someone with deuteranopia, where distinguishing between greens and reds becomes challenging.',
    images: [
      {
        url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Spring Garden',
        description: 'Garden with various shades of green plants'
      },
      {
        url: 'https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Vegetable Market',
        description: 'Fresh vegetables in different green and red hues'
      },
      {
        url: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Forest Path',
        description: 'Walking path through dense green forest'
      }
    ]
  },
  tritanopia: {
    title: 'Tritanopia Simulation',
    description: 'Understand how tritanopia affects the perception of blue and yellow colors in everyday scenes.',
    images: [
      {
        url: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Ocean View',
        description: 'Scenic beach with blue water and yellow sand'
      },
      {
        url: 'https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Sunset Sky',
        description: 'Evening sky with blue and yellow sunset colors'
      },
      {
        url: 'https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Exotic Bird',
        description: 'Bird with blue and yellow feathers'
      }
    ]
  },
  achromatopsia: {
    title: 'Achromatopsia Simulation',
    description: 'Experience complete color blindness, where the world is perceived in shades of gray.',
    images: [
      {
        url: 'https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Colorful Market',
        description: 'Vibrant market scene with various colored items'
      },
      {
        url: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Rainbow Garden',
        description: 'Garden with flowers of different colors'
      },
      {
        url: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Art Gallery',
        description: 'Collection of colorful paintings'
      }
    ]
  }
};

const VisionSimulationPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { setColorVisionType, setCorrectionEnabled, colorVisionType, correctionEnabled } = useVisionStore();
  const [loadedImages, setLoadedImages] = React.useState<Record<string, boolean>>({});

  const content = simulationContent[type as keyof typeof simulationContent];

  React.useEffect(() => {
    if (!content) {
      navigate('/color-vision');
      return;
    }
    setColorVisionType(type as ColorVisionType);
  }, [type, navigate, setColorVisionType]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  if (!content) return null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            setColorVisionType(null);
            setCorrectionEnabled(false);
            navigate('/color-vision');
          }}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Vision Types
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
            {content.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setCorrectionEnabled(!correctionEnabled)}
            className={`rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
              correctionEnabled
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            <span className="flex items-center">
              <Wand2 className="h-5 w-5 mr-2" />
              {correctionEnabled ? 'Disable Color Correction' : 'Enable Color Correction'}
            </span>
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.images.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gray-100 animate-pulse"
                  style={{ 
                    opacity: loadedImages[index] ? 0 : 1 
                  }}
                />
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionSimulationPage;