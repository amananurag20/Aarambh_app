/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#16202A',
    background: '#FFF8F0',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F2DFCC',
    textSecondary: '#6E6258',
    accent: '#FF8A1F',
    accentStrong: '#D95C00',
    accentSoft: '#FFE3C2',
    card: '#FFFFFF',
    cardBorder: '#F1D8BF',
    success: '#20B486',
    danger: '#D64545',
  },
  dark: {
    text: '#FFFFFF',
    background: '#06131A',
    backgroundElement: '#0B2430',
    backgroundSelected: '#173745',
    textSecondary: '#A8BCC5',
    accent: '#FF8A1F',
    accentStrong: '#FFB15C',
    accentSoft: '#3A2412',
    card: '#0C2633',
    cardBorder: '#1A4252',
    success: '#24D6A3',
    danger: '#FF6B5F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
