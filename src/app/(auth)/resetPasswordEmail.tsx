import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AppText from '~/src/components/AppText';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import { router } from 'expo-router';
import AppInput from '~/src/components/AppInput';
import { Divider } from '~/src/components/Divider';
import AppButton from '~/src/components/AppButton';
import AppHeader from '~/src/components/AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StatusBar } from 'expo-status-bar';
import BackIcon from '~/src/assets/svgs/BackIcon';

const ResetPasswordEmail = () => {
  const { sizes } = useResponsive();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Top Image Section with rounded bottom */}
      <View className="relative flex-[0.45] overflow-hidden   bg-[#CBF3C9]">
        <Image
          source={require('~/src/assets/images/ResetPassImage.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* Form Section with rounded top */}
      <View className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 shadow-lg">
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mt-12 flex-1">
            <View className="flex-row items-center gap-4 ">
              <BackIcon width={24} height={24} onPress={() => router.back()} />

              <AppText fontSize={sizes.fonts.title} className="font-INTER_BOLD">
                Reset Password
              </AppText>
            </View>

            <AppText
              fontSize={sizes.fonts.medium}
              className="text-SUMMARY_TEXT_COLOR mt-3 font-INTER_MEDIUM">
              Provide your email address below and we’ll send
            </AppText>
            <AppText
              fontSize={sizes.fonts.medium}
              className="text-SUMMARY_TEXT_COLOR font-INTER_MEDIUM">
              you instructions on how to reset your password.
            </AppText>

            <Divider height={sizes.spacing.lg} />

            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              isRequired
              errorMessage={errors.email}
            />

            <Divider height={sizes.spacing.xxl} />

            <AppButton label="Proceed" onPress={() => router.replace('/(auth)/resetPasswordOtp')} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ResetPasswordEmail;

const styles = StyleSheet.create({});
