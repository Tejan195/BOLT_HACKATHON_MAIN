import React from 'react';
import { Eye, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-white" />
        
        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-transparent bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text animate-text-gradient">
                VisionAid AI
              </span>
              <span className="mt-2 block text-gray-900">
                Web Accessibility for Everyone
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              Transform websites to be more accessible for people with visual impairments.
              Experience the web through different perspectives with our advanced color vision tools.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 flex justify-center gap-x-6"
            >
              <Link
                to="/color-vision"
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary-600 px-8 py-3 text-white transition hover:bg-primary-700"
              >
                <span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium transition-transform group-hover:translate-x-4">
                  Get Started
                </span>
              </Link>

              <Link
                to="/learn-more"
                className="inline-flex items-center rounded-full border border-primary-600 px-8 py-3 text-primary-600 transition hover:bg-primary-50"
              >
                <span className="text-sm font-medium">Learn More</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <svg
            className="h-40 w-full text-primary-100"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
              fillOpacity=".2"
            />
          </svg>
        </motion.div>
      </div>

      {/* Rest of the sections... */}
    </div>
  );
};

export default Hero;