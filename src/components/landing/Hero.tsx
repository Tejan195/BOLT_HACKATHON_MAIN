import React from 'react';
import { Eye, BookOpen, Target, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Main Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="block text-primary-600 animate-slide-up mb-2">VisionAid AI</span>
            <span className="block animate-slide-up-delay leading-tight">Web Accessibility for Everyone</span>
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-xl leading-relaxed text-gray-500 sm:max-w-3xl animate-fade-in-delay">
            Transform websites to be more accessible for people with visual impairments. Color
            correction for color blindness and dyslexia-friendly text, all in one tool.
          </p>
          <div className="mx-auto mt-12 max-w-sm sm:max-w-none sm:flex sm:justify-center animate-fade-in-up">
            <div className="sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-6 space-y-4 sm:space-y-0">
              <Link
                to="/color-vision"
                className="flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-primary-700 transition-all duration-300 hover:scale-105"
              >
                <Eye className="mr-3 h-5 w-5" />
                <span>Color Vision Tools</span>
              </Link>
              <Link
                to="/dyslexia"
                className="flex items-center justify-center rounded-md border border-transparent bg-primary-100 px-6 py-4 text-base font-medium text-primary-700 shadow-sm hover:bg-primary-200 transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                <span>Dyslexia Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Vision for Web Accessibility</h2>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
              Making the digital world accessible to everyone, one website at a time
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-100 text-primary-600 mx-auto mb-6 animate-bounce-slow">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals with visual impairments by providing innovative tools that enhance their web browsing experience and ensure equal access to digital content.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-100 text-primary-600 mx-auto mb-6 animate-bounce-slow">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Who We Help</h3>
              <p className="text-gray-600 leading-relaxed">
                We serve individuals with color vision deficiencies, dyslexia, and other visual processing challenges, helping them navigate the web with greater ease and confidence.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-100 text-primary-600 mx-auto mb-6 animate-bounce-slow">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                Using advanced AI and real-time color correction technology, we transform web content to accommodate different types of visual needs, making the internet truly inclusive.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl p-10 shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Impact & Statistics</h3>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <p className="text-5xl font-bold text-primary-600 animate-count-up mb-3">300M+</p>
                <p className="text-lg text-gray-600">People worldwide with color blindness</p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <p className="text-5xl font-bold text-primary-600 animate-count-up mb-3">15-20%</p>
                <p className="text-lg text-gray-600">Of people show symptoms of dyslexia</p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <p className="text-5xl font-bold text-primary-600 animate-count-up mb-3">96%</p>
                <p className="text-lg text-gray-600">Of websites fail accessibility standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;