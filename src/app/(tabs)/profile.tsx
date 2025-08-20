import { Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { router } from 'expo-router';
import AppHeader from '~/src/components/AppHeader';
import ProfileWithCamera from '~/src/assets/svgs/ProfileWithCamera';
import AppText from '~/src/components/AppText';

import { Divider } from '~/src/components/Divider';
import Footer from '~/src/components/Footer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AppButton from '~/src/components/AppButton';
import { CustomOverlayBackground } from '../(auth)/confirmResetPassword';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import { useBottomSheet } from '~/src/hooks/useBottomSheet';

import PhoneSvg from '~/src/assets/svgs/PhoneSvg';
import { APP_COLOR } from '~/src/constants/Color';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '~/src/hooks/useAuth';
import Toast from 'react-native-toast-message';

const Profile = () => {
  const insets = useSafeAreaInsets();

  const { sizes, device } = useResponsive();
  const isSmallScreen = device.height < 700;
  const { user, logout } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const menuItems = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Notifications' },
    {
      id: 3,
      label: 'Change Password',
    },
    {
      id: 4,
      label: 'Privacy Policies',
    },
    { id: 5, label: 'Contact Us' },
  ];

  return (
    <View className="h-full bg-[#FAFAFA]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Header */}
      <View className="bg-white pb-2">
        <AppHeader title="Profile" onBackPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 170 }}
        style={{}}>
        {/* Profile section */}
        <View className="mt-8">
          <View className="items-center">
            <ProfileWithCamera width={120} height={120} />
            <AppText className="mt-6 font-INTER_MEDIUM text-base text-[#1A1A1A]">
              {user.email}
            </AppText>
          </View>

          {/* Menu section */}
          <View className="mx-8 mt-8 rounded-lg border-2 border-[#E6E6E6] px-4 py-4">
            {menuItems.map((item, index) => (
              <View key={item.id}>
                <Pressable className="flex-row items-center justify-between py-4">
                  <AppText className="font-INTER_REGULAR text-[#1A1A1A]">{item.label}</AppText>
                </Pressable>
                {index < menuItems.length - 1 && <Divider bgColor="#E6E6E6" height={1} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        className="absolute left-0 right-0     px-8 py-4"
        style={{
          bottom: tabBarHeight,
        }}>
        <View className="flex-row items-center justify-between">
          <AppText
            className={`font-INTER_REGULAR text-[#B11B20] ${
              isSmallScreen ? 'text-sm' : 'text-base'
            }`}
            onPress={async () => {
              try {
                await logout();
                Toast.show({
                  type: 'success',
                  text1: 'Logged Out',
                  text2: 'See you next time!',
                });
                // Navigation will be handled automatically by auth state change
              } catch (error) {
                Toast.show({
                  type: 'error',
                  text1: 'Logout Failed',
                  text2: 'Please try again.',
                });
              }
            }}>
            Log out
          </AppText>
          <AppText
            className={`font-INTER_REGULAR text-[#1A1A1A] ${
              isSmallScreen ? 'text-sm' : 'text-base'
            }`}>
            Version 1.01
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
});
