import React, { useState, useEffect, useRef } from 'react';
import { Book, Type, Palette, Sparkles, Maximize2, AlignLeft, Ruler, Volume2, Wand2, ArrowLeftRight, ArrowUpDown } from 'lucide-react';
import { useVisionStore } from '../store/useVisionStore';
import { SpeechControls } from '../components/speech/SpeechControls';

interface BionicWord {
  text: string;
  emphasized: string;
}

const DyslexiaPage: React.FC = () => {
  const { dyslexiaSupport, setDyslexiaSupport } = useVisionStore();
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState<string>('lexend');
  const [backgroundColor, setBackgroundColor] = useState<'white' | 'cream' | 'light-blue' | 'mint'>('white');
  const [showReadingRuler, setShowReadingRuler] = useState(false);
  const [rulerPosition, setRulerPosition] = useState(0);
  const [bionicReading, setBionicReading] = useState(false);
  const [columnWidth, setColumnWidth] = useState(800);
  const contentRef = useRef<HTMLDivElement>(null);

  const fonts = [
    { value: 'lexend', label: 'Lexend', description: 'Optimized for reading speed' },
    { value: 'opendyslexic', label: 'OpenDyslexic', description: 'Weighted bottom characters' },
    { value: 'andika', label: 'Andika', description: 'Simple, clear letterforms' },
    { value: 'atkinson', label: 'Atkinson Hyperlegible', description: 'High character distinction' },
    { value: 'comic', label: 'Comic Neue', description: 'Casual, friendly style' }
  ];

  const sampleText = `
    The quick brown fox jumps over the lazy dog. This is a sample text that demonstrates
    how different settings affect readability for people with dyslexia. Reading can be
    challenging when letters appear to move or blur together. By adjusting these settings,
    we can make text more accessible and easier to read.

    Research has shown that certain fonts, color combinations, and spacing can significantly
    improve reading comprehension for individuals with dyslexia. The OpenDyslexic font,
    for example, was specifically designed with bottom-weighted characters to help prevent
    letter flipping and swapping.

    When we read, our brain processes text in complex ways. For people with dyslexia,
    this processing can be more challenging. Features like bionic reading help by
    emphasizing key parts of words, making them easier to recognize and process.
    
    Customizing text presentation can make a significant difference in reading comfort
    and comprehension. Try adjusting these settings to find what works best for you.
    Remember that everyone's needs are different, so take time to experiment with
    different combinations.
  `;

  useEffect(() => {
    if (dyslexiaSupport) {
      setFontFamily('opendyslexic');
      setFontSize(18);
      setLineSpacing(1.8);
      setLetterSpacing(0.5);
      setWordSpacing(0.3);
      setBackgroundColor('cream');
      setBionicReading(true);
    }
  }, [dyslexiaSupport]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (showReadingRuler) {
        setRulerPosition(e.clientY);
      }
    };

    if (showReadingRuler) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showReadingRuler]);

  const getBackgroundColor = () => {
    switch (backgroundColor) {
      case 'cream':
        return 'bg-[#faf3e0]';
      case 'light-blue':
        return 'bg-[#e8f4f8]';
      case 'mint':
        return 'bg-[#e8f8f3]';
      default:
        return 'bg-white';
    }
  };

  const getFontClass = () => {
    return `font-${fontFamily}`;
  };

  const processBionicText = (text: string): BionicWord[] => {
    return text.split(' ').map(word => {
      const emphasizedLength = Math.ceil(word.length * 0.6);
      return {
        text: word,
        emphasized: word.substring(0, emphasizedLength)
      };
    });
  };

  const renderBionicText = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      const words = processBionicText(paragraph.trim());
      return (
        <p key={index} className="mb-4">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="bionic-text">
              <span>{word.emphasized}</span>
              {word.text.substring(word.emphasized.length)}
              {' '}
            </span>
          ))}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-primary-500 to-violet-600 bg-clip-text">
              Advanced Dyslexia Support
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Customize your reading experience with comprehensive tools designed to make text more accessible
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  {fonts.map((font) => (
    <button
      key={font.value}
      onClick={() => {
        setFontFamily(font.value);
        if (dyslexiaSupport) setDyslexiaSupport(false);
      }}
      className={`w-full px-3 py-3 rounded-lg text-sm transition-all duration-300 text-center break-words whitespace-normal leading-tight ${
        fontFamily === font.value
          ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
      } ${`font-${font.value}`}`}
    >
      <div className="text-base mb-1 font-semibold">{font.label}</div>
      <div className="text-xs text-gray-600">{font.description}</div>
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
                  onChange={(e) => {
                    setFontSize(Number(e.target.value));
                    if (dyslexiaSupport) setDyslexiaSupport(false);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Line Spacing */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Line Spacing: {lineSpacing}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={lineSpacing}
                  onChange={(e) => {
                    setLineSpacing(Number(e.target.value));
                    if (dyslexiaSupport) setDyslexiaSupport(false);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Letter Spacing: {letterSpacing}em
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={letterSpacing}
                  onChange={(e) => {
                    setLetterSpacing(Number(e.target.value));
                    if (dyslexiaSupport) setDyslexiaSupport(false);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Word Spacing */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <AlignLeft className="h-4 w-4 mr-2" />
                  Word Spacing: {wordSpacing}em
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={wordSpacing}
                  onChange={(e) => {
                    setWordSpacing(Number(e.target.value));
                    if (dyslexiaSupport) setDyslexiaSupport(false);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Column Width */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <AlignLeft className="h-4 w-4 mr-2" />
                  Column Width: {columnWidth}px
                </label>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={columnWidth}
                  onChange={(e) => setColumnWidth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Palette className="h-4 w-4 mr-2" />
                  Background Color
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: 'white', label: 'White', color: 'bg-white' },
                    { value: 'cream', label: 'Cream', color: 'bg-[#faf3e0]' },
                    { value: 'light-blue', label: 'Cool', color: 'bg-[#e8f4f8]' },
                    { value: 'mint', label: 'Mint', color: 'bg-[#e8f8f3]' },
                  ].map((bg) => (
                    <button
                      key={bg.value}
                      onClick={() => {
                        setBackgroundColor(bg.value as any);
                        if (dyslexiaSupport) setDyslexiaSupport(false);
                      }}
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

              {/* Reading Tools */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowReadingRuler(!showReadingRuler)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    showReadingRuler
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <Ruler className="h-4 w-4 mr-2" />
                  Reading Ruler
                </button>

                <button
                  onClick={() => setBionicReading(!bionicReading)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    bionicReading
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Bionic Reading
                </button>
              </div>

              {/* Enable All Features */}
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
            ref={contentRef}
            className={`rounded-xl shadow-sm border border-gray-200 p-6 ${getBackgroundColor()}`}
            style={{ maxWidth: `${columnWidth}px` }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Preview</h2>
              <SpeechControls text={sampleText} />
            </div>
            <div
              className={`prose max-w-none ${getFontClass()}`}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineSpacing,
                letterSpacing: `${letterSpacing}em`,
                wordSpacing: `${wordSpacing}em`,
              }}
            >
              {bionicReading ? renderBionicText(sampleText) : sampleText.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {showReadingRuler && (
          <div
            className="reading-ruler"
            style={{ top: `${rulerPosition}px` }}
          />
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reading Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Take Regular Breaks',
                description: 'Rest your eyes every 20 minutes to reduce fatigue and maintain focus.',
                icon: Book,
              },
              {
                title: 'Use Reading Tools',
                description: 'Try the reading ruler and bionic reading to improve tracking and comprehension.',
                icon: Ruler,
              },
              {
                title: 'Adjust Settings',
                description: 'Experiment with different fonts and spacings to find what works best for you.',
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