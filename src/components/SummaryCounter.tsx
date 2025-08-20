import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider } from './Divider';
import { useResponsive } from './ResponsiveProvider';

const SummaryCounter = () => {
  const { sizes } = useResponsive();
  return (
    <View className="w-[47%] rounded-lg  border-2 border-[#F2F2F2] bg-[#FFFFFF] px-4 py-4 ">
      <Text className="font-INTER_REGULAR text-sm text-[#666666]">Total Plots</Text>
      <Divider height={sizes.spacing.sm} />
      <Text className="font-INTER_BOLD text-4xl text-[#072723]">0</Text>
    </View>
  );
};

export default SummaryCounter;

const styles = StyleSheet.create({});
