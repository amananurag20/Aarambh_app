import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import { Colors, DefaultThemeId, type AppThemeId } from '@/constants/theme';

const ThemeContext = createContext<{
  themeId: AppThemeId;
  setThemeId: (themeId: AppThemeId) => void;
  theme: (typeof Colors)[AppThemeId];
} | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [themeId, setThemeId] = useState<AppThemeId>(DefaultThemeId);
  const value = useMemo(
    () => ({
      themeId,
      setThemeId,
      theme: Colors[themeId],
    }),
    [themeId],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      themeId: DefaultThemeId,
      setThemeId: () => {},
      theme: Colors[DefaultThemeId],
    };
  }

  return context;
}
