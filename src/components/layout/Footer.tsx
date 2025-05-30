import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-50 to-primary-100 border-t border-primary-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-primary-600">
            <Heart className="h-5 w-5" />
            <p className="text-sm">
              Made with passion for accessibility
            </p>
          </div>
          
          <div>
            <p className="text-sm text-primary-700">
              &copy; {new Date().getFullYear()} VisionAid AI. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;