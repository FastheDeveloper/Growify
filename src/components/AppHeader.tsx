import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '~/src/components/AppText';
import BackIcon from '~/src/assets/svgs/BackIcon';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
};

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
  rightComponent,
}) => {
  const { sizes } = useResponsive();

  return (
    <SafeAreaView className="flex-row items-center justify-between  px-2">
      {/* Left: Back Button */}
      <View className="w-10 items-start">
        {showBack ? (
          <TouchableOpacity onPress={onBackPress ?? (() => router.back())} className="p-1">
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Center: Title */}
      <View className="flex-1 items-center">
        <AppText className="text-center font-INTER_MEDIUM" style={{ fontSize: sizes.fonts.large }}>
          {title}
        </AppText>
      </View>

      {/* Right: Optional Component */}
      <View className="w-10 items-end">{rightComponent || null}</View>
    </SafeAreaView>
  );
};

export default AppHeader;
