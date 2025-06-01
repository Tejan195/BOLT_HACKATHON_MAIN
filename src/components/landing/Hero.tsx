import React from 'react';
import { Eye, BookOpen, Target, Users, Sparkles, Download, Chrome, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* Main Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-primary-900/40 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_50%)]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text animate-text-gradient">
                VisionAid AI
              </span>
              <span className="mt-4 block text-white/90">
                Web Accessibility for Everyone
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-gray-300">
              Transform websites to be more accessible for people with visual impairments. 
              Color correction for color blindness, dyslexia-friendly text, and low vision support, all in one tool.
            </p>
            <div className="mx-auto mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/color-vision"
                className="group relative px-6 py-3 w-full sm:w-auto rounded-full bg-primary-600 text-white overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-primary-600 transition-transform duration-300 group-hover:scale-105"></div>
                <span className="relative flex items-center justify-center text-base font-medium">
                  <Eye className="mr-2 h-5 w-5" />
                  Color Vision Tools
                </span>
              </Link>
              <Link
                to="/dyslexia"
                className="group relative px-6 py-3 w-full sm:w-auto rounded-full bg-white/10 text-white overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 transition-transform duration-300 group-hover:scale-105"></div>
                <span className="relative flex items-center justify-center text-base font-medium">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Dyslexia Support
                </span>
              </Link>
              <Link
                to="/low-vision"
                className="group relative px-6 py-3 w-full sm:w-auto rounded-full bg-white/10 text-white overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 transition-transform duration-300 group-hover:scale-105"></div>
                <span className="relative flex items-center justify-center text-base font-medium">
                  <ZoomIn className="mr-2 h-5 w-5" />
                  Low Vision Support
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="min-h-screen relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-black to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.12),transparent_50%)]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4 text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text">
              About VisionAid AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing web accessibility through innovative AI-powered solutions, making the digital world more inclusive for everyone.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-4">Our Story</h3>
                <p className="text-gray-300 leading-relaxed">
                  Founded in 2025, VisionAid AI emerged from a simple yet powerful idea: everyone deserves equal access to digital content. Our team of accessibility experts, developers, and AI specialists came together to create innovative solutions for visual impairments.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-4">Our Technology</h3>
                <p className="text-gray-300 leading-relaxed">
                  We leverage cutting-edge AI and machine learning to provide real-time color correction, text enhancement, and visual accessibility features. Our technology adapts to individual needs, offering personalized solutions for various visual impairments.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  We're committed to breaking down digital barriers and creating a more inclusive online world. Through continuous innovation and user-centered design, we strive to make web content accessible to everyone, regardless of their visual abilities.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2">1M+</div>
                    <div className="text-sm text-gray-400">Users Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2">50K+</div>
                    <div className="text-sm text-gray-400">Websites Enhanced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2">98%</div>
                    <div className="text-sm text-gray-400">User Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-10 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Our Team Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  description: 'Constantly pushing boundaries to create better accessibility solutions',
                  icon: Sparkles
                },
                {
                  title: 'Inclusivity',
                  description: 'Ensuring our tools are accessible to everyone, regardless of ability',
                  icon: Users
                },
                {
                  title: 'Excellence',
                  description: 'Maintaining the highest standards in all our solutions and services',
                  icon: Target
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="inline-block p-4 rounded-full bg-primary-900/50 mb-4">
                    <value.icon className="h-8 w-8 text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Browser Extension Section */}
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-black to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.12),transparent_50%)]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4 text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text">
                Browser Extension
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Take VisionAid's color correction everywhere you go with our Chrome extension.
                Apply color filters to any website instantly.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-4xl mx-auto border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Color Vision Extension</h3>
                  <ul className="space-y-4 text-gray-300 mb-8">
                    <li className="flex items-center">
                      <Chrome className="h-5 w-5 text-primary-400 mr-3" />
                      Works on any website
                    </li>
                    <li className="flex items-center">
                      <Eye className="h-5 w-5 text-primary-400 mr-3" />
                      Supports all color vision types
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary-400 mr-3" />
                      Real-time color correction
                    </li>
                  </ul>
                  <a
                    href="/extension.zip"
                    download
                    className="group relative inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-primary-600 transition-transform duration-300 group-hover:scale-105"></div>
                    <span className="relative flex items-center">
                      <Download className="mr-2 h-5 w-5" />
                      Download Extension
                    </span>
                  </a>
                </div>
                
                <div className="bg-black/20 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4">How to Install:</h4>
                  <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                    <li>Download the extension</li>
                    <li>Open Chrome and go to Extensions</li>
                    <li>Enable Developer mode</li>
                    <li>Click "Load unpacked"</li>
                    <li>Select the downloaded folder</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-primary-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_50%)]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4 text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text">
                Our Vision for Web Accessibility
              </h2>
              <p className="text-xl text-gray-300">
                Making the digital world accessible to everyone, one website at a time
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  description: 'To empower individuals with visual impairments by providing innovative tools that enhance their web browsing experience.'
                },
                {
                  icon: Users,
                  title: 'Who We Help',
                  description: 'We serve individuals with color vision deficiencies, dyslexia, and other visual processing challenges.'
                },
                {
                  icon: Sparkles,
                  title: 'Our Solution',
                  description: 'Using advanced AI and real-time color correction technology to make the internet truly inclusive.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-900/50 text-primary-400 mx-auto mb-6">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-10 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">Impact & Statistics</h3>
              <div className="grid md:grid-cols-3 gap-12 text-center">
                {[
                  { value: '300M+', label: 'People worldwide with color blindness' },
                  { value: '15-20%', label: 'Of people show symptoms of dyslexia' },
                  { value: '96%', label: 'Of websites fail accessibility standards' }
                ].map((stat, index) => (
                  <div key={index} className="transform transition-all duration-300 hover:scale-105">
                    <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text mb-3">
                      {stat.value}
                    </p>
                    <p className="text-lg text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;