import React from 'react';
import { View, Image, SafeAreaView, StatusBar } from 'react-native';
import AppText from './AppText'; // your text component
import ProfileIcon from '../assets/svgs/ProfileIcon'; // default profile SVG
import BellIcon from '../assets/svgs/BellIcon';
import BellNotified from '../assets/svgs/BellNotifiedIcon';

type HeaderProps = {
  fullName: string;
  profileUrl?: string;
  isOnline?: boolean;
  hasNotification?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  fullName,
  profileUrl,
  isOnline = false,
  hasNotification = false,
}) => {
  return (
    <SafeAreaView className="w-full flex-row items-center justify-between gap-4 bg-[#0F6B2D] px-6 py-6">
      {/* Left Side */}
      <View className="flex-row items-center gap-4">
        {/* Profile */}
        {profileUrl ? (
          <Image source={{ uri: profileUrl }} className="h-12 w-12 rounded-full" />
        ) : (
          <ProfileIcon width={48} height={48} />
        )}

        {/* Name & Status */}
        <View className="gap-2">
          <AppText className="font-INTER_SEMIBOLD text-lg text-white">{fullName}</AppText>

          <View className="flex-row items-center gap-1 self-start rounded-lg bg-white px-2 py-1">
            <View className={`h-4 w-4 rounded-xl ${isOnline ? 'bg-[#439F6E]' : 'bg-red-500'}`} />
            <AppText className="font-INTER_REGULAR text-sm text-[#171717]">
              {isOnline ? 'Online' : 'Offline'}
            </AppText>
          </View>
        </View>
      </View>

      {/* Notification Icon */}
      {hasNotification ? (
        <BellNotified width={40} height={40} />
      ) : (
        <BellIcon width={40} height={40} />
      )}
    </SafeAreaView>
  );
};

export default Header;
