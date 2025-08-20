// streakContext.tsx
import React, { createContext, useContext } from 'react';
import { useStreak } from '../hooks/useStreak';

const StreakContext = createContext<ReturnType<typeof useStreak> | null>(null);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const streakData = useStreak();
  return <StreakContext.Provider value={streakData}>{children}</StreakContext.Provider>;
};

export const useStreakContext = () => {
  const ctx = useContext(StreakContext);
  if (!ctx) throw new Error('useStreakContext must be used within StreakProvider');
  return ctx;
};
