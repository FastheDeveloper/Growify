import React from 'react';
import { View } from 'react-native';

interface DividerProps {
  height?: number; // vertical spacing
  width?: number; // horizontal spacing
  bgColor?: string; // tailwind class or hex code (like 'bg-gray-200' or '#E0E0E0')
}

export const Divider: React.FC<DividerProps> = ({ height, width, bgColor = 'transparent' }) => {
  return (
    <View
      style={{
        height: height ?? 0,
        width: width ?? '100%',
        backgroundColor: bgColor,
      }}
    />
  );
};
