/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  aarambhDark: {
    text: '#F8FAFC',
    background: '#061B1A',
    backgroundElement: '#0B2A28',
    backgroundSelected: '#164E49',
    textSecondary: '#CBD5E1',
    accent: '#14B8A6',
    accentStrong: '#2DD4BF',
    accentSoft: 'rgba(20, 184, 166, 0.12)',
    card: '#103B38',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
  calmLight: {
    text: '#0F172A',
    background: '#F8FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1F5F9',
    textSecondary: '#64748B',
    accent: '#0F766E',
    accentStrong: '#115E59',
    accentSoft: '#CCFBF1',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
  focusBlue: {
    text: '#F8FAFC',
    background: '#071827',
    backgroundElement: '#102A43',
    backgroundSelected: '#1F4E79',
    textSecondary: '#B9D3EA',
    accent: '#38BDF8',
    accentStrong: '#7DD3FC',
    accentSoft: 'rgba(56, 189, 248, 0.15)',
    card: '#102A43',
    cardBorder: 'rgba(186, 230, 253, 0.12)',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
  sunrise: {
    text: '#FFF7ED',
    background: '#1F1308',
    backgroundElement: '#3A2412',
    backgroundSelected: '#653A16',
    textSecondary: '#FED7AA',
    accent: '#F59E0B',
    accentStrong: '#FDBA74',
    accentSoft: 'rgba(245, 158, 11, 0.16)',
    card: '#3A2412',
    cardBorder: 'rgba(253, 186, 116, 0.14)',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
  light: {
    text: '#0F172A',
    background: '#F8FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1F5F9',
    textSecondary: '#64748B',
    accent: '#0F766E',
    accentStrong: '#115E59',
    accentSoft: '#CCFBF1',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
  dark: {
    text: '#F8FAFC',
    background: '#061B1A',
    backgroundElement: '#0B2A28',
    backgroundSelected: '#164E49',
    textSecondary: '#CBD5E1',
    accent: '#14B8A6',
    accentStrong: '#2DD4BF',
    accentSoft: 'rgba(20, 184, 166, 0.12)',
    card: '#103B38',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
} as const;

export type AppThemeId = 'aarambhDark' | 'calmLight' | 'focusBlue' | 'sunrise';
export const DefaultThemeId: AppThemeId = 'aarambhDark';
export type ThemeColor = keyof (typeof Colors)[AppThemeId];

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

export const BottomTabInset = Platform.select({ ios: 50, android: 80, web: 78 }) ?? 0;
export const MaxContentWidth = 800;
