import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { AppStateProvider } from '@/hooks/app-state';
import { AppThemeProvider, useAppTheme } from '@/hooks/theme-context';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <AppThemeProvider>
      <ThemedLayout />
    </AppThemeProvider>
  );
}

function ThemedLayout() {
  const { themeId } = useAppTheme();

  return (
    <ThemeProvider value={themeId === 'calmLight' ? DefaultTheme : DarkTheme}>
      <AppStateProvider>
        <AnimatedSplashOverlay />
        <AppTabs />
      </AppStateProvider>
    </ThemeProvider>
  );
}
