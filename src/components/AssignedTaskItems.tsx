import React from 'react';
import { FlatList, Image, View } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';
import { Divider } from './Divider';
import { useResponsive } from './ResponsiveProvider';

type Task = {
  id: string | number;
  zone: string;
  plot: string;
  trees: number;
  image: string; // Local require() or remote URL
};

type AssignedTaskItemsProps = {
  tasks: Task[];
  onViewTask?: (id: string | number) => void;
};

const AssignedTaskItems = ({ tasks, onViewTask }: AssignedTaskItemsProps) => {
  const { sizes } = useResponsive();

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <View className="mx-6 my-3 overflow-hidden rounded-xl border-2 border-[#F2F2F2] bg-white">
        <Image
          source={
            typeof item.image === 'string' ? { uri: item.image } : item.image // for require()
          }
          style={{
            width: '100%',
            height: 150,
            resizeMode: 'stretch',
          }}
        />
        <View className="bg-white px-2 py-2">
          <View className="flex-row gap-2">
            <View className="flex-1">
              <AppText className="font-INTER_MEDIUM text-xs text-[#666666]">ID: {item.id}</AppText>
              <View className="flex-row items-center justify-between pt-3">
                <View className="flex-row items-center">
                  <AppText className="font-INTER_MEDIUM text-sm text-[#0B0D0F]">
                    {item.zone}
                  </AppText>
                </View>
              </View>
            </View>
          </View>

          <AppText className="pt-1 font-INTER_MEDIUM text-base text-[#8E8E8E]">{item.plot}</AppText>

          <Divider height={sizes.spacing.sm} />

          <View className="flex-row items-end justify-between">
            <AppText className="font-INTER_MEDIUM text-base text-[#8E8E8E]">
              Trees:{' '}
              <AppText className="font-INTER_REGULAR text-sm text-[#0B0D0F]">{item.trees}</AppText>
            </AppText>
            <AppButton
              className="rounded-md py-2"
              label="View"
              onPress={() => onViewTask?.(item.id)}
            />
          </View>
        </View>
      </View>
    );
  };

  if (!tasks || tasks.length === 0) {
    return (
      <View className="items-center py-8">
        <AppText className="font-INTER_MEDIUM text-base text-[#B3B3B3]">No Tasks Available</AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AssignedTaskItems;
