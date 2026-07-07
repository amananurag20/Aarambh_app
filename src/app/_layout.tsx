import { DarkTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { AppThemeProvider } from '@/hooks/theme-context';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <AppThemeProvider>
        <AnimatedSplashOverlay />
        <AppTabs />
      </AppThemeProvider>
    </ThemeProvider>
  );
}
