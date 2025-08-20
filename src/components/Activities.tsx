import React from 'react';
import { View, ScrollView } from 'react-native';
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
};

const ACTIVITIES: Activity[] = [
  { id: 'yoga', label: 'Yoga', Icon: Yoga },
  { id: 'exercise', label: 'Exercise', Icon: Gym },
  { id: 'cycling', label: 'Cycling', Icon: Cycling },
  { id: 'reading', label: 'Reading', Icon: Book },
  { id: 'more', label: 'More', Icon: More },
];

const ActivityItem = ({ label, Icon }: { label: string; Icon: React.FC<any> }) => (
  <View className="mr-6 items-center">
    <View className="rounded-full bg-PRIMARY_LIGHT p-5">
      <Icon width={16} height={16} />
    </View>
    <AppText className="mt-2 font-INTER_SEMIBOLD text-TEXT_SECONDARY">{label}</AppText>
  </View>
);

export default function ActivitiesRow() {
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
        <ActivityItem key={activity.id} label={activity.label} Icon={activity.Icon} />
      ))}
    </ScrollView>
  );
}
