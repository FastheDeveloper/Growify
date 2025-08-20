import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import AppText from './AppText';
import { APP_COLOR } from '../constants/Color';

interface DailyProgressCardProps {
  totalTasks: number;
  completedTasks: number;
}

const DailyProgressCard: React.FC<DailyProgressCardProps> = ({ totalTasks, completedTasks }) => {
  const radius = 24;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <View className="flex-row items-center rounded-2xl bg-PRIMARY px-6 py-4">
      {/* Progress Circle */}
      <View className="mr-4">
        <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
          {/* Background Circle */}
          <Circle
            stroke={APP_COLOR.PRIMARY}
            fill="none"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <Circle
            stroke="white"
            fill="none"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={radius + strokeWidth / 2}
            originY={radius + strokeWidth / 2}
          />
        </Svg>
        {/* Percentage in the middle */}
        <View className="absolute inset-0 items-center justify-center">
          <AppText className="font-INTER_BOLD text-white">{percent}%</AppText>
        </View>
      </View>

      {/* Texts */}
      <View>
        <AppText className="font-INTER_MEDIUM text-white">Your daily goal almost done</AppText>
        <AppText className="font-INTER_REGULAR text-sm text-white">
          {completedTasks} of {totalTasks} completed
        </AppText>
      </View>
    </View>
  );
};

export default DailyProgressCard;
