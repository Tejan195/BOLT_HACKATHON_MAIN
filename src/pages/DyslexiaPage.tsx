import React, { useState } from 'react';
import { Book, Type, Palette, Sparkles, Maximize2, AlignLeft } from 'lucide-react';
import { useVisionStore } from '../store/useVisionStore';

const DyslexiaPage: React.FC = () => {
  const { dyslexiaSupport, setDyslexiaSupport } = useVisionStore();
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [fontFamily, setFontFamily] = useState<'lexend' | 'opendyslexic'>('lexend');
  const [backgroundColor, setBackgroundColor] = useState<'white' | 'cream' | 'light-blue'>('white');

  const sampleText = `
    The quick brown fox jumps over the lazy dog. This is a sample text that demonstrates
    how different settings affect readability for people with dyslexia. Reading can be
    challenging when letters appear to move or blur together. By adjusting these settings,
    we can make text more accessible and easier to read.

    Research has shown that certain fonts, color combinations, and spacing can significantly
    improve reading comprehension for individuals with dyslexia. The OpenDyslexic font,
    for example, was specifically designed with bottom-weighted characters to help prevent
    letter flipping and swapping.
  `;

  const getBackgroundColor = () => {
    switch (backgroundColor) {
      case 'cream':
        return 'bg-[#faf3e0]';
      case 'light-blue':
        return 'bg-[#e8f4f8]';
      default:
        return 'bg-white';
    }
  };

  const getFontFamily = () => {
    switch (fontFamily) {
      case 'opendyslexic':
        return 'font-opendyslexic';
      default:
        return 'font-lexend';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Dyslexia Support Tools
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Customize your reading experience with tools designed to make text more accessible
            for people with dyslexia.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Book className="h-6 w-6 text-primary-600 mr-2" />
              Reading Settings
            </h2>

            <div className="space-y-6">
              {/* Font Family */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Type className="h-4 w-4 mr-2" />
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'lexend', label: 'Lexend' },
                    { value: 'opendyslexic', label: 'OpenDyslexic' },
                  ].map((font) => (
                    <button
                      key={font.value}
                      onClick={() => setFontFamily(font.value as 'lexend' | 'opendyslexic')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        fontFamily === font.value
                          ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="14"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Line Spacing */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <AlignLeft className="h-4 w-4 mr-2" />
                  Line Spacing: {lineSpacing}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={lineSpacing}
                  onChange={(e) => setLineSpacing(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Palette className="h-4 w-4 mr-2" />
                  Background Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'white', label: 'White', color: 'bg-white' },
                    { value: 'cream', label: 'Cream', color: 'bg-[#faf3e0]' },
                    { value: 'light-blue', label: 'Light Blue', color: 'bg-[#e8f4f8]' },
                  ].map((bg) => (
                    <button
                      key={bg.value}
                      onClick={() => setBackgroundColor(bg.value as 'white' | 'cream' | 'light-blue')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        bg.color
                      } ${
                        backgroundColor === bg.value
                          ? 'ring-2 ring-primary-500'
                          : 'ring-1 ring-gray-200 hover:ring-gray-300'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enable/Disable All Features */}
              <button
                onClick={() => setDyslexiaSupport(!dyslexiaSupport)}
                className={`w-full mt-4 flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  dyslexiaSupport
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {dyslexiaSupport ? 'Disable All Features' : 'Enable All Features'}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className={`rounded-xl shadow-sm border border-gray-200 p-6 ${getBackgroundColor()}`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preview</h2>
            <div
              className={`prose max-w-none ${getFontFamily()}`}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineSpacing,
              }}
            >
              {sampleText.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reading Tips</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Take Breaks',
                description: 'Regular breaks help reduce eye strain and maintain focus while reading.',
                icon: Book,
              },
              {
                title: 'Use a Ruler',
                description: 'Following text with a ruler or bookmark can help keep your place while reading.',
                icon: AlignLeft,
              },
              {
                title: 'Adjust Lighting',
                description: 'Ensure proper lighting to reduce glare and make text easier to read.',
                icon: Sparkles,
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <div className="flex items-center mb-2">
                  <tip.icon className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="font-medium text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaPage;