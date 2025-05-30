import { create } from 'zustand';
import { ColorVisionType, UserPreferences } from '../types';

interface VisionState extends UserPreferences {
  setColorVisionType: (type: ColorVisionType) => void;
  setDyslexiaSupport: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
}

export const useVisionStore = create<VisionState>((set) => ({
  colorVisionType: null,
  dyslexiaSupport: false,
  highContrast: false,
  setColorVisionType: (type) => set({ colorVisionType: type }),
  setDyslexiaSupport: (enabled) => set({ dyslexiaSupport: enabled }),
  setHighContrast: (enabled) => set({ highContrast: enabled }),
}));