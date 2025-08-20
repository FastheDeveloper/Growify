import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
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
const tasks = [
  { id: '1', label: 'Cycling', priority: 'low', status: 'done' },
  { id: '2', label: 'Reading', priority: 'medium', status: 'pending' },
  { id: '3', label: 'Yoga', priority: 'high', status: 'done' },
  { id: '4', label: 'Meditation', priority: 'low', status: 'pending' },
  { id: '5', label: 'Meditation', priority: 'high', status: 'pending' },
];
export default function Home() {
  const { streak, coinsEarnedToday, checkStreak, coins } = useStreakContext();
  const [showSplash, setShowSplash] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const { location, errorMsg } = useCurrentLocation();
  const { place } = useReverseGeocoding(location?.lat ?? null, location?.lng ?? null);
  const { sizes } = useResponsive();
  const { user } = useAuth();
  useEffect(() => {
    const init = async () => {
      const reward = await checkStreak(); // returns coins earned for today
      if (reward > 0) {
        setShowReward(true); // show streak fire animation
      } else {
        // check if it's a new day and just show splash
        // setShowSplash(true);
      }
    };
    init();
  }, []);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'done').length;
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>(
    'all'
  );

  // ✅ Filter tasks based on selected priority
  const filteredTasks =
    selectedPriority === 'all' ? tasks : tasks.filter((task) => task.priority === selectedPriority);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View className="flex-1 bg-white px-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <LocationIcon width={16} height={16} />
          <AppText className="font-INTER_SEMIBOLD text-sm text-PRIMARY_DARK">{place?.city}</AppText>
          <CavetDownIcon height={18} width={16} />
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
          {getTimeOfDay()} {user.name || 'Farouq'} !
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
        {filteredTasks.map((task) => (
          <>
            <Divider height={sizes.spacing.lg} />
            <GoalItems
              key={task.id}
              label={task.label}
              priority={task.priority as 'low' | 'medium' | 'high'}
              status={task.status as 'done' | 'pending'}
            />
          </>
        ))}
        <Button title="Test Fire Reward" onPress={() => setShowReward(true)} />
      </ScrollView>
      {/* Splash animation for new day login */}
      <LottieModal
        visible={showSplash}
        animation={CoinDrop}
        title="Welcome Back!"
        subtitle="Let's Growify today 🌱"
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
