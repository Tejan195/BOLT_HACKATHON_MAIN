import React from 'react';
import { Eye, BookOpen, Target, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Main Hero Section */}
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

      {/* Vision and Mission Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Vision for Web Accessibility</h2>
            <p className="mt-4 text-lg text-gray-600">
              Making the digital world accessible to everyone, one website at a time
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mx-auto mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Mission</h3>
              <p className="text-gray-600">
                To empower individuals with visual impairments by providing innovative tools that enhance their web browsing experience and ensure equal access to digital content.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Who We Help</h3>
              <p className="text-gray-600">
                We serve individuals with color vision deficiencies, dyslexia, and other visual processing challenges, helping them navigate the web with greater ease and confidence.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mx-auto mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Solution</h3>
              <p className="text-gray-600">
                Using advanced AI and real-time color correction technology, we transform web content to accommodate different types of visual needs, making the internet truly inclusive.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Impact & Statistics</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary-600">300M+</p>
                <p className="mt-2 text-gray-600">People worldwide with color blindness</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-600">15-20%</p>
                <p className="mt-2 text-gray-600">Of people show symptoms of dyslexia</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-600">96%</p>
                <p className="mt-2 text-gray-600">Of websites fail accessibility standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;