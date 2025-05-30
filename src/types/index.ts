export interface UserPreferences {
  colorVisionType: ColorVisionType | null;
  correctionEnabled: boolean;
  dyslexiaSupport: boolean;
  highContrast: boolean;
}

export type ColorVisionType = 
  | 'protanopia'    // Red-blind
  | 'deuteranopia'  // Green-blind
  | 'tritanopia'    // Blue-blind
  | 'achromatopsia' // Total color blindness
  | null;