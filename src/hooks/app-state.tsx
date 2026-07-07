import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

const storageKey = 'aarambh-app-state';

export type JournalEntry = {
  id: string;
  createdAt: string;
  mood: string;
  trigger: string;
  energy: string;
  sleep: string;
  note: string;
  helped: string;
  reset: boolean;
};

export type RescueSession = {
  id: string;
  completedAt: string;
  trigger: string;
  reduced: boolean;
};

type AppState = {
  cleanStartDate: string;
  bestStreak: number;
  journalEntries: JournalEntry[];
  rescueSessions: RescueSession[];
};

const defaultState: AppState = {
  cleanStartDate: new Date().toISOString(),
  bestStreak: 17,
  journalEntries: [],
  rescueSessions: [],
};

const AppStateContext = createContext<{
  state: AppState;
  currentStreak: number;
  saveJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  completeRescueSession: (session: Omit<RescueSession, 'id' | 'completedAt'>) => void;
  logReset: () => void;
} | null>(null);

function daysBetween(startIso: string, end = new Date()) {
  const start = new Date(startIso);
  const startDay = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(0, Math.floor((endDay - startDay) / 86400000) + 1);
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    AsyncStorage.getItem(storageKey)
      .then((value) => {
        if (value) {
          setState({ ...defaultState, ...JSON.parse(value) });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(state)).catch(() => {});
  }, [state]);

  const currentStreak = daysBetween(state.cleanStartDate);

  const value = useMemo(
    () => ({
      state,
      currentStreak,
      saveJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
        setState((current) => ({
          ...current,
          journalEntries: [
            {
              ...entry,
              id: createId('journal'),
              createdAt: new Date().toISOString(),
            },
            ...current.journalEntries,
          ],
        }));
      },
      completeRescueSession: (session: Omit<RescueSession, 'id' | 'completedAt'>) => {
        setState((current) => ({
          ...current,
          rescueSessions: [
            {
              ...session,
              id: createId('rescue'),
              completedAt: new Date().toISOString(),
            },
            ...current.rescueSessions,
          ],
        }));
      },
      logReset: () => {
        setState((current) => ({
          ...current,
          cleanStartDate: new Date().toISOString(),
          bestStreak: Math.max(current.bestStreak, currentStreak),
        }));
      },
    }),
    [currentStreak, state],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return context;
}
