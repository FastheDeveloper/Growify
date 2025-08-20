import { Stack } from 'expo-router';
import { useState, useEffect, Fragment, useCallback } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import LottieModal from '~/src/components/AnimationModal';
import CoinDrop from '~/src/assets/animations/coindrop.json';
import Fire from '~/src/assets/animations/Fire.json';
import { useStreak } from '~/src/hooks/useStreak';
import { useCurrentLocation } from '~/src/hooks/useCurrentLocation';
import { useReverseGeocoding } from '~/src/hooks/useReverseGeocoding';
import AppText from '~/src/components/AppText';
import LocationIcon from '~/src/assets/svgs/LocationIcon';
import CavetDownIcon from '~/src/assets/svgs/CaveetDown';
import CoinIcon from '~/src/assets/svgs/CoinIcon';
import BellIcon from '~/src/assets/svgs/BellIcon';
import { Divider } from '~/src/components/Divider';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import { useAuth } from '~/src/hooks/useAuth';
import { getTimeOfDay } from '~/src/utils/time';
import DailyProgressCard from '~/src/components/DailyProgressCard';
import ActivitiesRow from '~/src/components/Activities';
import GoalsFilter from '~/src/components/GoalsFilter';
import GoalItems from '~/src/components/GoalItems';
import { useStreakContext } from '~/src/providers/streakContext';
import EmptyTask from '~/src/assets/svgs/EmptyTask';
import { STORAGE_KEYS } from '~/src/constants/asyncKeys';
import { getValueFor, save } from '~/src/utils/secureStorage';
import { useFocusEffect } from '@react-navigation/native';
// Define types
type Priority = 'low' | 'medium' | 'high';
type Status = 'done' | 'pending';

type Task = {
  id: string;
  label: string;
  priority: Priority;
  status: Status;
};

// ✅ Strongly type tasks (empty or seeded)
const tasks: Task[] = [
  { id: '1', label: 'Cycling', priority: 'low', status: 'done' },
  { id: '2', label: 'Reading', priority: 'medium', status: 'pending' },
  { id: '3', label: 'Yoga', priority: 'high', status: 'done' },
  { id: '4', label: 'Meditation', priority: 'low', status: 'pending' },
  { id: '5', label: 'Meditations', priority: 'high', status: 'pending' },
];

export default function Home() {
  const { streak, coinsEarnedToday, checkStreak, coins, markTaskDone, claimReward } =
    useStreakContext();
  const [showSplash, setShowSplash] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const { location, errorMsg } = useCurrentLocation();
  const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');
  const [isNewUser, setIsNewUser] = useState(false);
  const { place } = useReverseGeocoding(location?.lat ?? null, location?.lng ?? null);
  const { sizes } = useResponsive();
  const { user } = useAuth();

  // ✅ load tasks from SecureStorage
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');

  useEffect(() => {
    const init = async () => {
      const reward = await checkStreak(); // returns coins earned for today
      console.log('====================================');
      console.log(reward);
      console.log('====================================');
      if (reward > 0) {
        setShowReward(true); // show streak fire animation
      } else {
        // setShowSplash(true); // optional splash
      }
    };
    init();
  }, []);

  useEffect(() => {
    const checkNewUserStatus = async () => {
      try {
        const hasSeenWelcome = await getValueFor(STORAGE_KEYS.HAS_SEEN_WELCOME);
        const isFirstVisit = !hasSeenWelcome;

        if (isFirstVisit && user) {
          setIsNewUser(true);
          setShowSplash(true);
          // Mark that user has seen the welcome screen
          await save(STORAGE_KEYS.HAS_SEEN_WELCOME, 'true');
        }
      } catch (error) {
        console.error('Error checking new user status:', error);
      }
    };

    if (user) {
      checkNewUserStatus();
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        const stored = await getValueFor(STORAGE_KEYS.TASKS);
        setTasks(stored ? JSON.parse(stored) : []);
      };

      loadTasks();
    }, [])
  );

  const handleMarkTaskDone = async (id: string) => {
    try {
      // Update UI immediately for instant feedback
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'done' as Status } : t)));

      // Then update the backend
      await markTaskDone(id);
      console.log(`Task ${id} marked as done`);
    } catch (err) {
      console.error('Error marking task done:', err);
      // Revert UI changes if backend call fails
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: 'pending' as Status } : t))
      );
    }
  };

  // ✅ Handle claim reward - update UI immediately then call backend
  const handleClaimReward = async (id: string) => {
    try {
      // Remove task from UI immediately for instant feedback
      setTasks((prev) => prev.filter((t) => t.id !== id));

      // Then update the backend
      const newBalance = await claimReward(id);
      console.log(`Reward claimed! New balance: ${newBalance}`);
    } catch (err) {
      console.error('Error claiming reward:', err);
      // Revert UI changes if backend call fails - restore the task
      const stored = await getValueFor(STORAGE_KEYS.TASKS);
      const allTasks = stored ? JSON.parse(stored) : [];
      const restoredTask = allTasks.find((task: Task) => task.id === id);
      if (restoredTask) {
        setTasks((prev) => [...prev, restoredTask]);
      }
    }
  };
  // ✅ Task logic
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'done').length;

  const filteredTasks =
    selectedPriority === 'all' ? tasks : tasks.filter((task) => task.priority === selectedPriority);

  const emptyMessage =
    totalTasks === 0 ? 'No tasks created yet' : `No ${selectedPriority} priority tasks`;

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View className="flex-1 bg-white px-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <LocationIcon width={16} height={16} />
          <AppText className="font-INTER_SEMIBOLD text-sm text-PRIMARY_DARK">
            {place?.city || 'Loading location'}
          </AppText>
          <CavetDownIcon height={20} width={16} />
        </View>

        <View className="flex-row items-center gap-8">
          <View className="flex-row items-center rounded-3xl bg-PRIMARY_LIGHT px-3 py-1">
            <CoinIcon width={16} height={16} />
            <AppText className="font-INTER_SEMIBOLD text-base ">
              {coins}
              <AppText className="font-INTER_MEDIUM text-xs ">pts</AppText>
            </AppText>
          </View>
          <BellIcon width={16} height={20} />
        </View>
      </View>
      <Divider height={sizes.spacing.lg} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight * 1.5 }}>
        <AppText className="font-INTER_REGULAR text-lg text-TEXT_PRIMARY">
          {getTimeOfDay()} {user.email} !
        </AppText>
        <AppText className="font-INTER_BOLD text-2xl text-TEXT_PRIMARY">
          You Got This,{' '}
          <AppText className="font-INTER_BOLD text-2xl text-PRIMARY_DARK">Grow !</AppText>
        </AppText>
        <Divider height={sizes.spacing.lg} />
        <DailyProgressCard totalTasks={totalTasks} completedTasks={completedTasks} />
        <Divider height={sizes.spacing.lg} />
        <AppText className="font-INTER_SEMIBOLD text-lg text-TEXT_PRIMARY">Categories</AppText>
        <Divider height={sizes.spacing.sm} />
        <View>
          <ActivitiesRow />
        </View>
        <Divider height={sizes.spacing.md} />
        <GoalsFilter onChange={(priority) => setSelectedPriority(priority)} />
        <Divider height={sizes.spacing.lg} />

        <AppText className="font-INTER_SEMIBOLD text-lg text-TEXT_SECONDARY">Ongoing</AppText>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Fragment key={task.id.toString()}>
              <Divider height={sizes.spacing.lg} />
              <GoalItems
                label={task.label}
                priority={task.priority as 'low' | 'medium' | 'high'}
                status={task.status as 'done' | 'pending'}
                id={task.id.toString()}
                onMarkDone={handleMarkTaskDone}
                onClaimReward={handleClaimReward}
              />
            </Fragment>
          ))
        ) : (
          <View className=" items-center justify-center">
            <EmptyTask width={64} height={64} />
            <Divider height={sizes.spacing.sm} />
            <AppText className="text-center font-INTER_MEDIUM text-sm text-[#B3B3B3]">
              No ongoing goal
            </AppText>
            <AppText className="text-center font-INTER_MEDIUM text-sm text-[#B3B3B3]">yet</AppText>
          </View>
        )}

        {/* <Button title="Test Fire Reward" onPress={() => setShowReward(true)} /> */}
      </ScrollView>
      {/* Splash animation for new day login */}
      <LottieModal
        visible={showSplash}
        animation={CoinDrop}
        title="You've created your account!"
        subtitle="You get 300pts for creating account and 5 pts for each day streak, and 10pts for each completed task🌱"
        loop={false}
        onClose={() => setShowSplash(false)}
      />

      {/* Fire animation for streak reward */}
      <LottieModal
        visible={showReward}
        animation={Fire}
        title={`🔥 Day ${streak} Streak!`}
        subtitle={`You earned +${coinsEarnedToday} coins 💰, total coin ${coins}`}
        loop={false}
        onClose={() => setShowReward(false)}
      />
    </View>
  );
}
