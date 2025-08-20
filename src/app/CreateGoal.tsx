import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import AppHeader from '~/src/components/AppHeader';
import AppText from '~/src/components/AppText';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import AppInput from '~/src/components/AppInput';
import AppButton from '~/src/components/AppButton';
import AnimatedPicker from '~/src/components/AppPicker';
import { Divider } from '~/src/components/Divider';

import Cyclist from '~/src/assets/svgs/Cyclist';
import Reader from '~/src/assets/svgs/Reader';
import Yogi from '~/src/assets/svgs/Yogi';
import Lifter from '~/src/assets/svgs/Lifter';
import Meditator from '~/src/assets/svgs/Meditator';

import { save, getValueFor } from '~/src/utils/secureStorage';
import { STORAGE_KEYS } from '~/src/constants/asyncKeys';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  label: keyof typeof LABEL_ICONS;
  priority: Priority;
  status: 'done' | 'pending';
  remark?: string;
}

const LABEL_ICONS: Record<string, React.ReactNode> = {
  Cycling: <Cyclist width={64} height={64} />,
  Reading: <Reader width={64} height={64} />,
  Yoga: <Yogi width={64} height={64} />,
  Lifting: <Lifter width={64} height={64} />,
  Meditation: <Meditator width={64} height={64} />,
};

const CreateTask = () => {
  const { sizes, device } = useResponsive();
  const insets = useSafeAreaInsets();

  // Get the preselected label from route params
  const params = useLocalSearchParams();
  const preselectedLabel = params.preselectedLabel as string | undefined;

  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);

  // Set preselected label when component mounts
  useEffect(() => {
    if (preselectedLabel && Object.keys(LABEL_ICONS).includes(preselectedLabel)) {
      setSelectedLabel(preselectedLabel);
    }
  }, [preselectedLabel]);

  // Form validation
  const isFormValid = useMemo(() => {
    return !!selectedLabel && !!selectedPriority;
  }, [selectedLabel, selectedPriority]);

  const handleSubmit = async () => {
    const newTask: Task = {
      id: Date.now().toString(),
      label: selectedLabel as keyof typeof LABEL_ICONS,
      priority: selectedPriority!,
      status: 'pending',
    };

    // Load existing tasks
    const stored = await getValueFor(STORAGE_KEYS.TASKS);
    const existing: Task[] = stored ? JSON.parse(stored) : [];

    const updated = [...existing, newTask];

    await save(STORAGE_KEYS.TASKS, JSON.stringify(updated));

    router.back(); // go back to tasks list
  };

  const isSmallScreen = device.height < 700;
  const buttonBottomPadding = isSmallScreen ? 16 : 24;

  return (
    <View className="flex-1 bg-[#FAFAFA] px-4">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View className="bg-white pb-2">
        <AppHeader title="Create Task" onBackPress={() => router.back()} />
      </View>

      <KeyboardAwareScrollView
        className="py-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <AppText
          className="text-left font-INTER_REGULAR text-[#666666]"
          style={{ fontSize: sizes.fonts.body }}>
          Create a new task to track your daily activities.
        </AppText>

        <Divider height={sizes.spacing.md} />

        {/* Label Picker */}
        <AnimatedPicker
          label="Select Category"
          placeholder="Choose activity"
          isRequired
          data={Object.keys(LABEL_ICONS).map((title) => ({ title }))}
          onValueChange={(item) => setSelectedLabel(item?.title || null)}
          toValue={200}
          // Pass the preselected value to the picker
          initialValue={preselectedLabel ? { title: preselectedLabel } : undefined}
        />

        <Divider height={sizes.spacing.md} />

        {/* Priority Picker */}
        <AnimatedPicker
          label="Priority"
          placeholder="Select"
          isRequired
          data={[{ title: 'high' }, { title: 'medium' }, { title: 'low' }]}
          onValueChange={(item) => setSelectedPriority(item?.title as Priority)}
          toValue={140}
        />

        <Divider height={sizes.spacing.md} />

        {/* Optional remark */}
      </KeyboardAwareScrollView>

      {/* Footer Submit */}
      <View
        style={{
          paddingVertical: buttonBottomPadding,
          paddingBottom: Math.max(insets.bottom + buttonBottomPadding, buttonBottomPadding),
        }}>
        <AppButton
          label="Save Task"
          className="rounded-3xl"
          style={{
            minHeight: isSmallScreen ? 48 : 56,
          }}
          textStyle={{
            fontSize: isSmallScreen ? 16 : 18,
          }}
          disabled={!isFormValid}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
