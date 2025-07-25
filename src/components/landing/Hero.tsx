import React from 'react';
import { Eye, Github, Twitter, Users, Sparkles, Download, Chrome, BookOpen, Target } from 'lucide-react';
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              <span className="block text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text animate-text-gradient">
                VisionAid
              </span>
              <span className="mt-4 block text-white/90">
                Web Accessibility for Everyone
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300 px-4">
              Transform websites to be more accessible for people with color vision deficiency and dyslexia. 
              Experience color correction, dyslexia-friendly text, and interactive vision exercises.
            </p>
            <div className="mx-auto mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold sm:text-4xl mb-4 text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text">
              About VisionAid
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up px-4">
              Hi, I'm Tej. I created VisionAid during the Bolt Hackathon with a simple yet powerful belief: 
              everyone deserves equal access to digital content, regardless of their visual abilities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 px-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 card-hover animate-scale-in">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Story</h3>
              <p className="text-gray-300 leading-relaxed">
                The idea for VisionAid was born from my personal commitment to digital accessibility. 
                During the Bolt Hackathon, I set out to create a solution that would make the web truly 
                inclusive. What started as a hackathon project has grown into a comprehensive suite of 
                tools that help people with color vision deficiency and dyslexia access digital content effortlessly.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 card-hover animate-scale-in">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to break down digital barriers and create a web that's truly accessible to 
                everyone. VisionAid is more than just a tool – it's a commitment to continuous 
                innovation in web accessibility. We're dedicated to developing and improving features that 
                help people with visual challenges navigate the digital world with confidence.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 card-hover animate-scale-in">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Technology</h3>
              <p className="text-gray-300 leading-relaxed">
                VisionAid uses advanced web technologies like React and CSS filters to provide real-time 
                color correction and visual enhancement. We've implemented sophisticated color filters 
                for different types of color blindness, smart text rendering for dyslexia support, and 
                interactive exercises for vision training.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 card-hover animate-scale-in">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Features & Impact</h3>
              <ul className="space-y-4 stagger-animation">
                <li className="flex items-start text-gray-300 animate-slide-in-right">
                  <Sparkles className="h-6 w-6 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Real-time color correction for multiple types of color blindness</span>
                </li>
                <li className="flex items-start text-gray-300 animate-slide-in-right">
                  <BookOpen className="h-6 w-6 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Dyslexia-friendly text rendering with customizable fonts and spacing</span>
                </li>
                <li className="flex items-start text-gray-300 animate-slide-in-right">
                  <Target className="h-6 w-6 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Interactive vision exercises for improved visual performance</span>
                </li>
                <li className="flex items-start text-gray-300 animate-slide-in-right">
                  <Chrome className="h-6 w-6 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Browser extension for system-wide accessibility improvements</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 animate-fade-in card-hover">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Looking Forward</h3>
            <p className="text-gray-300 text-center max-w-3xl mx-auto">
              VisionAid is just the beginning. We're committed to continuing development and innovation 
              in web accessibility. In the future, we plan to explore new technologies to provide even 
              more personalized and effective accessibility solutions. Together, we can create a digital 
              world that's truly accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Browser Extension Section */}
      <div id="browser-extension" className="min-h-screen relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-black to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.12),transparent_50%)]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold sm:text-4xl mb-4 text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text">
                Browser Extension
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Take VisionAid's color correction everywhere you go with our Chrome extension.
                Apply color filters to any website instantly.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">Color Vision Extension</h3>
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
                    href="https://somkonpwqjjqiibyjqio.supabase.co/storage/v1/object/public/extension//visionaid.zip"
                    download
                    className="group relative inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105"
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
              <h2 className="text-2xl font-bold sm:text-4xl mb-4 text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text">
                Our Vision for Web Accessibility
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">
                Making the digital world accessible to everyone, one website at a time
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  description: 'To empower individuals with color vision deficiency and dyslexia by providing innovative tools that enhance their web browsing experience.'
                },
                {
                  icon: Users,
                  title: 'Who We Help',
                  description: 'We serve individuals with color vision deficiencies, dyslexia, and those seeking to improve their visual performance.'
                },
                {
                  icon: Sparkles,
                  title: 'Our Solution',
                  description: 'Using advanced web technologies and real-time color correction to make the internet truly inclusive.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-900/50 text-primary-400 mx-auto mb-6">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-8 text-center">Impact & Statistics</h3>
              <div className="grid md:grid-cols-3 gap-8 sm:gap-12 text-center">
                {[
                  { value: '300M+', label: 'People worldwide with color blindness' },
                  { value: '15-20%', label: 'Of people show symptoms of dyslexia' },
                  { value: '96%', label: 'Of websites fail accessibility standards' }
                ].map((stat, index) => (
                  <div key={index} className="transform transition-all duration-300 hover:scale-105">
                    <p className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-primary-500 bg-clip-text mb-3">
                      {stat.value}
                    </p>
                    <p className="text-base sm:text-lg text-gray-400">{stat.label}</p>
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