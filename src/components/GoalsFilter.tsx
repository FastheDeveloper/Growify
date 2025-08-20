import React, { useState } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import AppText from './AppText';
import { router } from 'expo-router';

const PRIORITIES = [
  { id: 'all', label: 'All', color: 'PRIMARY' },
  { id: 'high', label: 'High', color: 'ERROR' },
  { id: 'medium', label: 'Medium', color: 'WARNING' },
  { id: 'low', label: 'Low', color: 'PRIMARY' },
];

export type Priority = 'all' | 'high' | 'medium' | 'low';

type GoalsFilterProps = {
  onChange?: (priority: Priority) => void;
};

export default function GoalsFilter({ onChange }: GoalsFilterProps) {
  const [selected, setSelected] = useState<Priority>('all');

  const handlePress = (id: Priority) => {
    setSelected(id);
    onChange?.(id); // notify parent if onChange provided
  };

  return (
    <View>
      <AppText className="font-INTER_SEMIBOLD text-lg text-TEXT_PRIMARY">
        Your Goals for Today
      </AppText>

      <View className="mt-1 flex-row items-center">
        {PRIORITIES.map((item) => {
          const isActive = selected === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              className="mx-1 flex-1"
              onPress={() => handlePress(item.id as Priority)}
              activeOpacity={0.7}>
              <View
                className={`items-center rounded-2xl border-2 px-1 py-1 ${
                  isActive ? `bg-PRIMARY` : ''
                } border-${item.color}`}>
                <AppText
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  className={`font-INTER_SEMIBOLD ${
                    isActive ? 'text-white' : `text-${item.color}`
                  }`}>
                  {item.label}
                </AppText>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* New Goal Button */}
        <Pressable onPress={() => router.navigate('/CreateGoal')} className="mx-1 items-center">
          <View className="aspect-square w-12 items-center justify-center rounded-full bg-PRIMARY">
            <AppText className="text-3xl text-white">+</AppText>
          </View>
          <AppText className="text-md mt-2 font-INTER_SEMIBOLD text-TEXT_PRIMARY">New Goal</AppText>
        </Pressable>
      </View>
    </View>
  );
}
