import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from './AppText';
import ClockDone from '../assets/svgs/ClockDone';

import Cyclist from '../assets/svgs/Cyclist';
import AppButton from './AppButton';
import ClockUndone from '../assets/svgs/ClockUnDone';
import { APP_COLOR } from '../constants/Color';
import Yogi from '../assets/svgs/Yogi';
import Lifter from '../assets/svgs/Lifter';
import Reader from '../assets/svgs/Reader';
import Meditator from '../assets/svgs/Meditator';
import { useStreak } from '../hooks/useStreak';
import { useStreakContext } from '../providers/streakContext';

// Types
type Priority = 'low' | 'medium' | 'high';
type Status = 'done' | 'pending';

type GoalItemProps = {
  id: string;
  priority: Priority;
  status: Status;
  label: string;
  onMarkDone: (id: string) => Promise<void>;
  onClaimReward: (id: string) => Promise<void>;
};

const PRIORITY_STYLES = {
  low: {
    bg: 'bg-PRIMARY_LIGHT',
    chipBg: 'bg-PRIMARY_DARK',
    text: 'text-PRIMARY_DARK',
    icon: APP_COLOR.PRIMARY_DARK,
  },
  medium: {
    bg: 'bg-ACCENT_LIGHT',
    chipBg: 'bg-ACCENT_DARK',
    text: 'text-ACCENT_DARK',
    icon: APP_COLOR.ACCENT_DARK,
  },
  high: {
    bg: 'bg-ERROR/20',
    chipBg: 'bg-ERROR',
    text: 'text-ERROR',
    icon: APP_COLOR.ERROR,
  },
};

const LABEL_ICONS: Record<string, React.ReactNode> = {
  Cycling: <Cyclist width={64} height={64} />,
  Reading: <Reader width={64} height={64} />,
  Yoga: <Yogi width={64} height={64} />,
  Lifting: <Lifter width={64} height={64} />,
  Meditation: <Meditator width={64} height={64} />, // example, reuse Yogi
};

const GoalItems: React.FC<GoalItemProps> = ({
  id,
  priority,
  status,
  label,
  onMarkDone,
  onClaimReward,
}) => {
  const priorityStyle = PRIORITY_STYLES[priority];

  const handleMarkAsDone = async () => {
    try {
      await onMarkDone(id);
      console.log(`Task ${id} marked as done`);
    } catch (err) {
      console.error('Error marking task done:', err);
    }
  };

  const handleClaimReward = async () => {
    try {
      const newBalance = await onClaimReward(id);
      console.log(`Reward claimed! New balance: ${newBalance}`);
    } catch (err) {
      console.error('Error claiming reward:', err);
    }
  };

  return (
    <View className={`rounded-2xl px-4 py-2 ${priorityStyle.bg}`}>
      <View className="flex-row items-center justify-between">
        <AppText
          className={`rounded-3xl px-2 text-center font-INTER_MEDIUM text-white ${priorityStyle.chipBg}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </AppText>

        <View className="flex-row items-center gap-2">
          {status === 'done' ? (
            <ClockDone color={priorityStyle.icon} width={18} height={18} />
          ) : (
            <ClockUndone color={priorityStyle.icon} width={18} height={18} />
          )}
          <AppText className={`font-INTER_SEMIBOLD ${priorityStyle.text}`}>
            {status === 'done' ? 'Done' : 'Pending'}
          </AppText>
        </View>
      </View>

      <View className="flex-row justify-between pt-4">
        <View>
          <AppText className="pl-8 font-INTER_SEMIBOLD text-xl text-TEXT_PRIMARY">{label}</AppText>
          {LABEL_ICONS[label] ?? null}
        </View>

        <View>
          <View className="flex-row items-center justify-end gap-4 pb-4">
            <View className="aspect-square w-8 items-center justify-center rounded-full bg-PRIMARY">
              {status === 'done' ? (
                <AppText className="text-xl text-white">✓</AppText>
              ) : (
                <AppText className="text-xl text-white">x</AppText>
              )}
            </View>
            <AppText className="font-INTER_SEMIBOLD text-lg text-TEXT_PRIMARY ">
              {status === 'done' ? '100%' : '  0%'}
              <AppText className="font-INTER_SEMIBOLD text-base text-TEXT_SECONDARY">
                {' '}
                completed
              </AppText>
            </AppText>
          </View>

          <View className="flex-row items-center justify-end gap-4">
            {status === 'done' ? (
              <>
                <AppButton
                  label="Claim Reward"
                  className="bg-white"
                  textStyle={{ color: 'black' }}
                  onPress={handleClaimReward}
                />
                {/* <AppButton label="Completed" /> */}
              </>
            ) : (
              <AppButton label="Mark as Done" onPress={handleMarkAsDone} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoalItems;
