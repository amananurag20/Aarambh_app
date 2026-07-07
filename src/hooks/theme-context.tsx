import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { Colors, DefaultThemeId, type AppThemeId } from '@/constants/theme';

const storageKey = 'aarambh-theme';
const themeIds = ['aarambhDark', 'calmLight', 'focusBlue', 'sunrise'] satisfies AppThemeId[];

const ThemeContext = createContext<{
  themeId: AppThemeId;
  setThemeId: (themeId: AppThemeId) => void;
  theme: (typeof Colors)[AppThemeId];
} | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [themeId, setThemeIdState] = useState<AppThemeId>(() => {
    if (typeof globalThis.localStorage === 'undefined') {
      return DefaultThemeId;
    }

    const storedTheme = globalThis.localStorage.getItem(storageKey);
    return themeIds.includes(storedTheme as AppThemeId) ? (storedTheme as AppThemeId) : DefaultThemeId;
  });

  useEffect(() => {
    if (typeof globalThis.localStorage !== 'undefined') {
      globalThis.localStorage.setItem(storageKey, themeId);
    }
  }, [themeId]);

  const setThemeId = (nextThemeId: AppThemeId) => {
    setThemeIdState(nextThemeId);
  };

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
