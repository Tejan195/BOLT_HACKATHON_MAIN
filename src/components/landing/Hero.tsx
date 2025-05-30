import React from 'react';
import { Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block text-primary-600">VisionAid AI</span>
            <span className="block">Web Accessibility for Everyone</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-xl text-gray-500 sm:max-w-3xl">
            Transform websites to be more accessible for people with visual impairments. Color
            correction for color blindness and dyslexia-friendly text, all in one tool.
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:max-w-none sm:flex sm:justify-center">
            <div className="sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
              <Link
                to="/color-vision"
                className="flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 transition-colors duration-300"
              >
                <Eye className="mr-2 h-5 w-5" />
                <span>Color Vision Tools</span>
              </Link>
              <Link
                to="/dyslexia"
                className="flex items-center justify-center rounded-md border border-transparent bg-primary-100 px-4 py-3 text-base font-medium text-primary-700 shadow-sm hover:bg-primary-200 transition-colors duration-300"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                <span>Dyslexia Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero