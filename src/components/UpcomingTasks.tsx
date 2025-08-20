import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import AppText from './AppText';
import AppButton from './AppButton';
import EmptyTask from '../assets/svgs/EmptyTask';
import PlantingIcon from '../assets/svgs/PlantingIcon';
import MaintenanceIcon from '../assets/svgs/MaintenanceIcon';
import { Divider } from './Divider';
import { useResponsive } from './ResponsiveProvider';
import { APP_COLOR } from '../constants/Color';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';

const statusStyles: Record<string, { bg: string; textColor: string }> = {
  Upcoming: { bg: APP_COLOR.BG_UPCOMING, textColor: APP_COLOR.UPCOMING_TEXT },
  Done: { bg: APP_COLOR.BG_DONE, textColor: APP_COLOR.DONE_TEXT },
  Pending: { bg: APP_COLOR.BG_PENDING, textColor: APP_COLOR.PENDING_TEXT },
  Maintenance: { bg: 'rgba(3, 136, 181, 0.1)', textColor: APP_COLOR.MAINTENANCE_TEXT },
  Due: { bg: APP_COLOR.BG_DUE, textColor: APP_COLOR.DUE_TEXT },
};

interface UpcomingTasksProps {
  tasks: any[];
  headerComponent?: React.ReactNode;
  showViewAll?: boolean;
}

const UpcomingTasks = ({ tasks, headerComponent, showViewAll = true }: UpcomingTasksProps) => {
  const { sizes } = useResponsive();
  const tabBarHeight = useBottomTabBarHeight();

  const renderItem = ({ item }: { item: any }) => {
    const Icon = item.type === 'Planting' ? PlantingIcon : MaintenanceIcon;
    const statusStyle = statusStyles[item.status] || statusStyles.Upcoming;

    return (
      <Pressable onPress={() => router.navigate('/(tasks)/taskHistoryDetails')}>
        <View className="mb-3 rounded-md border-2 border-[#F2F2F2] bg-white px-2 py-2 ">
          <View className="flex-row gap-2">
            <View className="flex-1">
              <AppText className="font-INTER_MEDIUM text-xs text-[#666666]">ID: {item.id}</AppText>
              <View className="flex-row items-start justify-between pt-2">
                <View className="flex-row items-center">
                  <Icon width={14} height={14} />
                  <AppText className="ml-1 font-INTER_REGULAR text-sm text-[#0F6B2D]">
                    {item.type}
                  </AppText>
                </View>
                <AppButton
                  className="rounded-md   "
                  style={{ backgroundColor: statusStyle.bg }}
                  textStyle={{ color: statusStyle.textColor }}
                  label={item.status}
                  py="py-2"
                />
              </View>
            </View>
          </View>

          <AppText className="font-INTER_MEDIUM text-base text-[#070707]">{item.zone}</AppText>

          <View className="flex-row items-end justify-between">
            <AppText className="font-INTER_MEDIUM text-base text-[#8E8E8E]">
              {item.plot} • {item.trees} Trees
            </AppText>
            <AppText className="font-INTER_REGULAR text-base text-[#666666]">{item.due}</AppText>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderEmptyComponent = () => (
    <View className="h-full items-center justify-center">
      <EmptyTask width={64} height={64} />
      <Divider height={sizes.spacing.sm} />
      <AppText className="text-center font-INTER_MEDIUM text-sm text-[#B3B3B3]">
        No upcoming task
      </AppText>
      <AppText className="text-center font-INTER_MEDIUM text-sm text-[#B3B3B3]">yet</AppText>
    </View>
  );

  const renderListHeader = () => {
    return (
      <View>
        {headerComponent}
        {/* Section title for Upcoming Tasks */}
        {showViewAll && (
          <View className="flex-row items-center justify-between pb-1">
            <View className="flex-row items-center">
              <AppText className="font-INTER_SEMIBOLD text-sm text-[#1A1A1A]">
                Upcoming Tasks
              </AppText>
              <View className="ml-2 rounded-md bg-[#0BB503] px-2" />
            </View>

            <AppText
              className="font-INTER_MEDIUM text-base text-[#0BB503]"
              onPress={() =>
                router.navigate({
                  pathname: '/(tasks)/assignedTaskList',
                  params: { name: 'Upcoming Tasks' },
                })
              }>
              View All
            </AppText>
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: tabBarHeight * 1.5 }}
      ListHeaderComponent={renderListHeader}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

export default UpcomingTasks;
