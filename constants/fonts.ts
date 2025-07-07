// Font configuration for Quicksand and Rubik families
export const fonts = {
  // Quicksand font family
  quicksand: {
    light: 'Quicksand-Light',
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    semiBold: 'Quicksand-SemiBold',
    bold: 'Quicksand-Bold',
  },
  // Rubik font family
  rubik: {
    light: 'Rubik_300Light',
    lightItalic: 'Rubik_300Light_Italic',
    regular: 'Rubik_400Regular',
    regularItalic: 'Rubik_400Regular_Italic',
    medium: 'Rubik_500Medium',
    mediumItalic: 'Rubik_500Medium_Italic',
    semiBold: 'Rubik_600SemiBold',
    semiBoldItalic: 'Rubik_600SemiBold_Italic',
    bold: 'Rubik_700Bold',
    boldItalic: 'Rubik_700Bold_Italic',
    extraBold: 'Rubik_800ExtraBold',
    extraBoldItalic: 'Rubik_800ExtraBold_Italic',
    black: 'Rubik_900Black',
    blackItalic: 'Rubik_900Black_Italic',
  },
} as const;

// Font weight constants
export const fontWeights = {
  light: fonts.quicksand.light,
  regular: fonts.quicksand.regular,
  medium: fonts.quicksand.medium,
  semiBold: fonts.quicksand.semiBold,
  bold: fonts.quicksand.bold,
} as const;

// Rubik font weight constants
export const rubikFontWeights = {
  light: fonts.rubik.light,
  lightItalic: fonts.rubik.lightItalic,
  regular: fonts.rubik.regular,
  regularItalic: fonts.rubik.regularItalic,
  medium: fonts.rubik.medium,
  mediumItalic: fonts.rubik.mediumItalic,
  semiBold: fonts.rubik.semiBold,
  semiBoldItalic: fonts.rubik.semiBoldItalic,
  bold: fonts.rubik.bold,
  boldItalic: fonts.rubik.boldItalic,
  extraBold: fonts.rubik.extraBold,
  extraBoldItalic: fonts.rubik.extraBoldItalic,
  black: fonts.rubik.black,
  blackItalic: fonts.rubik.blackItalic,
} as const;

// Helper function to get font family
export const getFont = (weight: keyof typeof fontWeights) => {
  return fontWeights[weight];
};

// Type for font weights
export type FontWeight = keyof typeof fontWeights;

// Font size constants
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// Complete font configuration
export const typography = {
  fonts,
  fontWeights,
  fontSizes,
  getFont,
} as const; 