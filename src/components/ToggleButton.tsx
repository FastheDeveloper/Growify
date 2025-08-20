import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { APP_COLOR } from '../constants/Color';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: () => void;
  activeColor?: string; // pill background when active
  inactiveColor?: string; // pill background when inactive
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onToggle,
  activeColor = APP_COLOR.PRIMARY,
  inactiveColor = '#E6E6E6',
}) => {
  return (
    <View className="flex-row items-center gap-3">
      {/* Left label */}
      <Text className="font-INTER_SEMIBOLD text-lg">🥲 No</Text>

      {/* Toggle pill */}
      <Pressable
        onPress={onToggle}
        className="h-7 w-14 flex-row items-center rounded-full px-1"
        style={{
          backgroundColor: value ? activeColor : inactiveColor,
          justifyContent: value ? 'flex-end' : 'flex-start',
        }}>
        <View className="h-5 w-5 rounded-full bg-white" style={{ elevation: 2 }} />
      </Pressable>

      {/* Right label */}
      <Text className="font-INTER_SEMIBOLD text-lg">😁 Yes</Text>
    </View>
  );
};

export default ToggleSwitch;
