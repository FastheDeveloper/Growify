import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AppText from './AppText';

import Yoga from '~/src/assets/svgs/Yoga';
import Gym from '~/src/assets/svgs/Gym';
import Cycling from '~/src/assets/svgs/Cycling';
import Book from '~/src/assets/svgs/BookIcon';
import More from '~/src/assets/svgs/MoreIcon';

type Activity = {
  id: string;
  label: string;
  Icon: React.FC<any>;
  // Map to the labels used in CreateTask component
  taskLabel?: string;
};

const ACTIVITIES: Activity[] = [
  { id: 'yoga', label: 'Yoga', Icon: Yoga, taskLabel: 'Yoga' },
  { id: 'exercise', label: 'Exercise', Icon: Gym, taskLabel: 'Lifting' }, // Maps to "Lifting" in CreateTask
  { id: 'cycling', label: 'Cycling', Icon: Cycling, taskLabel: 'Cycling' },
  { id: 'reading', label: 'Reading', Icon: Book, taskLabel: 'Reading' },
  { id: 'more', label: 'More', Icon: More }, // No taskLabel - won't navigate
];

const ActivityItem = ({
  label,
  Icon,
  onPress,
}: {
  label: string;
  Icon: React.FC<any>;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View className="mr-6 items-center">
      <View className="rounded-full bg-PRIMARY_LIGHT p-5">
        <Icon width={16} height={16} />
      </View>
      <AppText className="mt-2 font-INTER_SEMIBOLD text-TEXT_SECONDARY">{label}</AppText>
    </View>
  </TouchableOpacity>
);

export default function ActivitiesRow() {
  const handleActivityPress = (activity: Activity) => {
    // Don't navigate if it's the "More" button or no taskLabel is defined
    if (activity.id === 'more' || !activity.taskLabel) {
      console.log('More button clicked - no navigation');
      return;
    }

    // Navigate to CreateGoal screen with the selected label as a parameter
    router.push({
      pathname: '/CreateGoal',
      params: {
        preselectedLabel: activity.taskLabel,
      },
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1, // allow container to grow and center content
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}>
      {ACTIVITIES.map((activity) => (
        <ActivityItem
          key={activity.id}
          label={activity.label}
          Icon={activity.Icon}
          onPress={() => handleActivityPress(activity)}
        />
      ))}
    </ScrollView>
  );
}
