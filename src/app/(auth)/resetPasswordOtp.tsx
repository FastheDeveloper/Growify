import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import { router } from 'expo-router';
import AppText from '~/src/components/AppText';
import AppHeader from '~/src/components/AppHeader';
import AppButton from '~/src/components/AppButton';
import { Divider } from '~/src/components/Divider';
import PinInput from '~/src/components/PinInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StatusBar } from 'expo-status-bar';
import BackIcon from '~/src/assets/svgs/BackIcon';

const ResetPasswordOtp = () => {
  const { sizes } = useResponsive();

  const handleComplete = (pin: string) => {
    console.log('PIN complete:', pin);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Top Image Section with rounded bottom */}
      <View className="relative flex-[0.45] overflow-hidden  bg-[#CBF3C9]">
        <Image
          source={require('~/src/assets/images/ResetOtp.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* OTP Form Section with rounded top */}
      <View className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 shadow-lg">
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mt-12 flex-1">
            {/* Title */}
            <View className="flex-row items-center gap-4 ">
              <BackIcon width={24} height={24} onPress={() => router.back()} />

              <AppText fontSize={sizes.fonts.title} className="font-INTER_BOLD">
                Enter OTP
              </AppText>
            </View>
            <AppText
              fontSize={sizes.fonts.medium}
              className="text-SUMMARY_TEXT_COLOR mt-3 font-INTER_MEDIUM">
              Enter the verification code sent to your email
            </AppText>
            <AppText
              fontSize={sizes.fonts.medium}
              className="text-SUMMARY_TEXT_COLOR font-INTER_MEDIUM">
              address
            </AppText>

            {/* OTP Input */}
            <Divider height={sizes.spacing.xxl} />
            <PinInput length={5} onComplete={handleComplete} boxSize={48} />
            <Divider height={sizes.spacing.xxl} />

            {/* Verify Button */}
            <AppButton
              label="Verify"
              onPress={() => router.replace('/(auth)/confirmResetPassword')}
            />

            {/* Resend Link */}
            <Divider height={sizes.spacing.lg} />
            <AppText
              className="mt-2 text-center font-INTER_MEDIUM text-[#687588]"
              fontSize={sizes.fonts.medium}>
              Didn’t receive any verification code?
              <AppText className="font-INTER_MEDIUM text-SUCCESS" fontSize={sizes.fonts.medium}>
                {' '}
                Resend
              </AppText>
            </AppText>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ResetPasswordOtp;

const styles = StyleSheet.create({});
