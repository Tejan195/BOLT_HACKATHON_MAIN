import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, Wand2, ArrowLeft, Sun, Moon } from 'lucide-react';
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
      },
      {
        url: 'https://images.pexels.com/photos/1171170/pexels-photo-1171170.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Flower Garden',
        description: 'Garden with red roses and various flowers'
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
      },
      {
        url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Traffic Junction',
        description: 'Night scene with traffic lights and signals'
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
      },
      {
        url: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Coastal Landscape',
        description: 'Beautiful coastline with blue ocean and yellow beach'
      }
    ]
  },
  achromatopsia: {
    title: 'Achromatopsia Simulation',
    description: 'Experience complete color blindness, where the world is perceived in shades of gray. We\'ve enhanced this section with high contrast options and detailed patterns to improve visibility.',
    images: [
      {
        url: 'https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Market Scene',
        description: 'Market stalls with various items - Notice the different textures and patterns that help distinguish items',
        contrast: 'High contrast helps differentiate stall layouts and product arrangements'
      },
      {
        url: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Textured Garden',
        description: 'Garden with varied flower shapes and patterns - Focus on the different textures and heights',
        contrast: 'Distinct patterns help identify different plant types'
      },
      {
        url: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Art Patterns',
        description: 'Artwork with strong geometric patterns and varying textures - Notice the depth and contrast',
        contrast: 'Strong lines and shapes create clear visual separation'
      },
      {
        url: 'https://images.pexels.com/photos/1038935/pexels-photo-1038935.jpeg?auto=compress&cs=tinysrgb&w=1280',
        title: 'Festival Textures',
        description: 'Festival scene with varied light intensities and patterns - Focus on light and shadow differences',
        contrast: 'Light variations create distinct visual zones'
      }
    ]
  }
};

const VisionSimulationPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { setColorVisionType, setCorrectionEnabled, colorVisionType, correctionEnabled } = useVisionStore();
  const [loadedImages, setLoadedImages] = React.useState<Record<string, boolean>>({});
  const [highContrast, setHighContrast] = React.useState(false);

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

  const isAchromatopsia = type === 'achromatopsia';

  return (
    <div className={`min-h-screen pt-24 pb-16 ${highContrast ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            setColorVisionType(null);
            setCorrectionEnabled(false);
            navigate('/color-vision');
          }}
          className={`flex items-center ${
            highContrast ? 'text-white hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'
          } transition-colors duration-300 mb-8`}
          aria-label="Back to vision types"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Vision Types
        </button>

        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            highContrast ? 'text-white' : 'text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text'
          }`}>
            {content.title}
          </h1>
          <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            {content.description}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {isAchromatopsia && (
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center ${
                highContrast
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
              }`}
              aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
            >
              {highContrast ? (
                <Sun className="h-5 w-5 mr-2" />
              ) : (
                <Moon className="h-5 w-5 mr-2" />
              )}
              {highContrast ? 'Standard Contrast' : 'High Contrast'}
            </button>
          )}
          
          <button
            onClick={() => setCorrectionEnabled(!correctionEnabled)}
            className={`rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
              correctionEnabled
                ? highContrast ? 'bg-white text-black' : 'bg-primary-600 text-white'
                : highContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900 hover:bg-primary-50 hover:text-primary-600'
            }`}
            aria-label={correctionEnabled ? 'Disable color correction' : 'Enable color correction'}
          >
            <span className="flex items-center">
              <Wand2 className="h-5 w-5 mr-2" />
              {correctionEnabled ? 'Disable Color Correction' : 'Enable Color Correction'}
            </span>
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {content.images.map((image, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden ${
                highContrast 
                  ? 'bg-gray-900 border-2 border-white' 
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg'
              } transition-all duration-300`}
            >
              <div className="relative aspect-video overflow-hidden">
                <div 
                  className={`absolute inset-0 ${highContrast ? 'bg-gray-800' : 'bg-gray-100'} animate-pulse`}
                  style={{ opacity: loadedImages[index] ? 0 : 1 }}
                />
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  } ${highContrast ? 'contrast-125 brightness-110' : ''}`}
                />
              </div>
              <div className="p-6">
                <h3 className={`font-semibold text-lg mb-2 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                  {image.title}
                </h3>
                <p className={`text-sm mb-3 ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                  {image.description}
                </p>
                {isAchromatopsia && image.contrast && (
                  <p className={`text-sm italic ${highContrast ? 'text-primary-400' : 'text-primary-600'}`}>
                    {image.contrast}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionSimulationPage;