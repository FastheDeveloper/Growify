import { useEffect, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/asyncKeys';
import { getValueFor, save } from '../utils/secureStorage';

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export const useStreak = () => {
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [coinsEarnedToday, setCoinsEarnedToday] = useState(0);

  const checkStreak = useCallback(async () => {
    const today = getTodayString();

    const storedStreak = parseInt((await getValueFor(STORAGE_KEYS.STREAK_COUNT)) || '0', 10);
    const lastOpenDate = await getValueFor(STORAGE_KEYS.LAST_OPEN_DATE);
    const storedCoins = parseInt((await getValueFor(STORAGE_KEYS.COIN_BALANCE)) || '0', 10);

    // First ever open → give signup + day 1 reward
    if (!lastOpenDate) {
      const reward = 300 + 5;
      await save(STORAGE_KEYS.STREAK_COUNT, '1');
      await save(STORAGE_KEYS.LAST_OPEN_DATE, today);
      await save(STORAGE_KEYS.COIN_BALANCE, String(storedCoins + reward));

      setStreak(1);
      setCoins(storedCoins + reward);
      setCoinsEarnedToday(reward);
      return reward;
    }

    // Already opened today → no reward
    if (lastOpenDate === today) {
      setStreak(storedStreak);
      setCoins(storedCoins);
      setCoinsEarnedToday(0);
      return 0;
    }

    // Check if yesterday was last open
    const lastDate = new Date(lastOpenDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate.toDateString() === yesterday.toDateString()) {
      // Continue streak
      const newStreak = storedStreak + 1;
      const reward = newStreak * 5;
      const updatedCoins = storedCoins + reward;

      await save(STORAGE_KEYS.STREAK_COUNT, String(newStreak));
      await save(STORAGE_KEYS.LAST_OPEN_DATE, today);
      await save(STORAGE_KEYS.COIN_BALANCE, String(updatedCoins));

      setStreak(newStreak);
      setCoins(updatedCoins);
      setCoinsEarnedToday(reward);
      return reward;
    } else {
      // Streak broken → reset to day 1
      const reward = 5; // new day 1 reward
      const resetCoins = 300 + reward;

      await save(STORAGE_KEYS.STREAK_COUNT, '1');
      await save(STORAGE_KEYS.LAST_OPEN_DATE, today);
      await save(STORAGE_KEYS.COIN_BALANCE, String(resetCoins));

      setStreak(1);
      setCoins(resetCoins);
      setCoinsEarnedToday(reward);
      return reward;
    }
  }, []);

  const completeTask = async (id: string) => {
    // read existing tasks
    const stored = await getValueFor(STORAGE_KEYS.TASKS);
    const tasks = stored ? JSON.parse(stored) : [];

    // update the task
    const updated = tasks.map((task: any) => (task.id === id ? { ...task, status: 'done' } : task));

    // save updated tasks
    await save(STORAGE_KEYS.TASKS, JSON.stringify(updated));

    // reward coins
    const coinStored = await getValueFor(STORAGE_KEYS.COIN_BALANCE);
    const currentCoins = coinStored ? parseInt(coinStored, 10) : 0;
    const newBalance = currentCoins + 10;

    await save(STORAGE_KEYS.COIN_BALANCE, newBalance.toString());

    return newBalance;
  };

  const markTaskDone = async (id: string) => {
    const stored = await getValueFor(STORAGE_KEYS.TASKS);
    const tasks = stored ? JSON.parse(stored) : [];

    const updated = tasks.map((task: any) => (task.id === id ? { ...task, status: 'done' } : task));

    await save(STORAGE_KEYS.TASKS, JSON.stringify(updated));
    return updated;
  };

  /** ✅ claim reward and remove the task */
  const claimReward = async (id: string) => {
    const stored = await getValueFor(STORAGE_KEYS.TASKS);
    const tasks = stored ? JSON.parse(stored) : [];

    // remove the completed task
    const remaining = tasks.filter((task: any) => task.id !== id);

    await save(STORAGE_KEYS.TASKS, JSON.stringify(remaining));

    // reward coins
    const coinStored = await getValueFor(STORAGE_KEYS.COIN_BALANCE);
    const currentCoins = coinStored ? parseInt(coinStored, 10) : 0;
    const newBalance = currentCoins + 10;

    await save(STORAGE_KEYS.COIN_BALANCE, newBalance.toString());
    setCoins(newBalance);

    return newBalance;
  };

  useEffect(() => {
    checkStreak(); // run once on mount
  }, [checkStreak]);

  return { streak, coins, coinsEarnedToday, checkStreak, completeTask, markTaskDone, claimReward };
};
