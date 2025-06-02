import React, { useState } from 'react';
import { Volume2, VolumeX, Settings2 } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';

interface SpeechControlsProps {
  text: string;
  className?: string;
}

export const SpeechControls: React.FC<SpeechControlsProps> = ({ text, className = '' }) => {
  const { speak, stop, speaking, voices, currentVoice, setVoice } = useSpeech();
  const [showSettings, setShowSettings] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      speak(text, { rate, pitch, volume, voice: currentVoice });
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleSpeak}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          {speaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              Stop Reading
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </>
          )}
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
          title="Speech Settings"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {showSettings && (
        <div className="bg-white rounded-lg shadow-lg p-4 space-y-4 border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voice</label>
            <select
              value={currentVoice?.voiceURI}
              onChange={(e) => {
                const voice = voices.find(v => v.voiceURI === e.target.value);
                if (voice) setVoice(voice);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              {voices.map(voice => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};