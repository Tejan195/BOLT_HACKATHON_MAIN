import React from 'react';
import { Eye, BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block text-primary-600">VisionAid AI</span>
            <span className="block">Web Accessibility for Everyone</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 sm:max-w-3xl">
            Transform websites to be more accessible for people with visual impairments.
            Color correction for color blindness and dyslexia-friendly text, all in one tool.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
              >
                <Eye className="h-5 w-5 mr-2" />
                <span>Color Vision Tools</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors duration-300"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Dyslexia Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;