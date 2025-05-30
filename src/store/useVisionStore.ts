import { create } from 'zustand';
import { ColorVisionType, UserPreferences } from '../types';

interface VisionState extends UserPreferences {
  setColorVisionType: (type: ColorVisionType) => void;
  setCorrectionEnabled: (enabled: boolean) => void;
  setDyslexiaSupport: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
}

export const useVisionStore = create<VisionState>((set) => ({
  colorVisionType: null,
  correctionEnabled: false,
  dyslexiaSupport: false,
  highContrast: false,
  setColorVisionType: (type) => set({ colorVisionType: type }),
  setCorrectionEnabled: (enabled) => set({ correctionEnabled: enabled }),
  setDyslexiaSupport: (enabled) => set({ dyslexiaSupport: enabled }),
  setHighContrast: (enabled) => set({ highContrast: enabled }),
}));