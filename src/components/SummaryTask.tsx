import { Image, StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import { Divider } from './Divider';
import { useResponsive } from './ResponsiveProvider';
import EmptyPlot from '../assets/svgs/EmptyPlot';
import AppText from './AppText';
import AppButton from './AppButton';

type Task = {
  id: string | number;
  title: string;
  plot: string;
  treeCount: number;
  image?: string;
  type: string;
};

type SummaryTaskProps = {
  item: {
    tasks: Task[];
  };
  onViewAll?: () => void;
  onViewTask?: (taskId: string | number, type: string) => void;
};

const SummaryTask: React.FC<SummaryTaskProps> = ({ item, onViewAll, onViewTask }) => {
  const { sizes } = useResponsive();
  const taskCount = item?.tasks?.length || 0;

  return (
    <View className="rounded-lg border-2 border-[#F2F2F2] bg-[#FFFFFF] py-4">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pb-1">
        <View className="flex-row items-center">
          <AppText className="font-INTER_SEMIBOLD text-sm text-[#1A1A1A]">Assigned Task</AppText>
          <View className="ml-2 rounded-md bg-[#0BB503] px-2">
            <AppText className="font-INTER_REGULAR text-sm text-white">{taskCount}</AppText>
          </View>
        </View>
        <AppText onPress={onViewAll} className="font-INTER_MEDIUM text-base text-[#0BB503]">
          View All
        </AppText>
      </View>

      {/* Divider */}
      <Divider height={2} />
      <Divider height={1} bgColor="#F2F2F2" />
      <Divider height={2} />
      <Divider height={sizes.spacing.sm} />

      {/* Content */}
      {taskCount === 0 ? (
        <View className="items-center py-4">
          <EmptyPlot width={40} height={40} />
          <Divider height={sizes.spacing.sm} />
          <AppText className="text-center font-INTER_MEDIUM text-sm text-[#B3B3B3]">
            No assigned plot
          </AppText>
          <AppText className="text-center font-INTER_MEDIUM text-sm text-[#B3B3B3]">yet</AppText>
        </View>
      ) : (
        <FlatList
          data={item.tasks}
          keyExtractor={(task) => task.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, gap: 12 }}
          renderItem={({ item: task }) => (
            <View className="w-[300px] flex-row gap-2 rounded-md border-2 border-[#F2F2F2] bg-white p-2">
              {task?.image ? (
                <Image
                  source={{ uri: task.image }}
                  style={{ width: 70, height: 70, borderRadius: 6 }}
                />
              ) : (
                <Image
                  source={require('../assets/images/SmallImage.png')}
                  style={{ width: 70, height: 70, borderRadius: 6 }}
                />
              )}

              <View className="flex-1">
                <View>
                  <AppText className="text-md font-INTER_MEDIUM text-[#0B0D0F]">
                    {task?.title}
                  </AppText>
                  <AppText className="font-INTER_REGULAR text-sm text-[#8E8E8E]">
                    {task?.plot}
                  </AppText>
                </View>
                <View className="   flex-row items-end justify-between">
                  <AppText className="font-INTER_REGULAR text-base text-[#8E8E8E]">
                    Tree: <AppText className="text-[#0B0D0F]">{task?.treeCount}</AppText>
                  </AppText>
                  <AppButton
                    className="  rounded-md py-2"
                    textStyle={{ color: 'white' }}
                    label="View"
                    onPress={() => onViewTask?.(task.id, task.type)}
                    py="py-2"
                  />
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SummaryTask;

const styles = StyleSheet.create({});
