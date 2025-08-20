import { Image, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { router } from 'expo-router';
import AppButton from '~/src/components/AppButton';
import AppHeader from '~/src/components/AppHeader';
import AppText from '~/src/components/AppText';
import { Divider } from '~/src/components/Divider';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import EyeCloseIcon from '~/src/assets/svgs/EyeCloseIcon';
import EyeOpenIcon from '~/src/assets/svgs/EyeOpenIcon';
import AppInput from '~/src/components/AppInput';
import BottomSheet, {
  BottomSheetBackgroundProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import DoneIcon from '~/src/assets/svgs/DoneIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StatusBar } from 'expo-status-bar';

export const CustomOverlayBackground = (props: BottomSheetBackgroundProps) => {
  const { style } = props;
  return (
    <View
      style={[
        style,
        {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
      ]}
    />
  );
};

const ConfirmResetPassword = () => {
  const { sizes } = useResponsive();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ confirmPassword: '', password: '' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = (index: number) => {
    setIsSheetOpen(index >= 0);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Top Image Section with rounded bottom */}
      <View className="relative flex-[0.45] overflow-hidden   bg-[#CBF3C9]">
        <Image
          source={require('~/src/assets/images/CreatePassImaage.png')}
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
            <AppText fontSize={sizes.fonts.title} className="font-INTER_BOLD">
              Create Password
            </AppText>
            <AppText
              fontSize={sizes.fonts.medium}
              className="text-SUMMARY_TEXT_COLOR mt-3 font-INTER_MEDIUM">
              Passwords must be at least 6 characters long
            </AppText>

            <Divider height={sizes.spacing.lg} />

            <AppInput
              label="Password"
              placeholder="*******"
              passwordToggle
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              customShowIcon={<EyeOpenIcon width={20} height={20} />}
              customHideIcon={<EyeCloseIcon width={20} height={20} />}
              isRequired
              errorMessage={errors.password}
            />

            <Divider height={sizes.spacing.lg} />

            <AppInput
              label="Confirm Password"
              placeholder="*******"
              passwordToggle
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              customShowIcon={<EyeOpenIcon width={20} height={20} />}
              customHideIcon={<EyeCloseIcon width={20} height={20} />}
              isRequired
              errorMessage={errors.confirmPassword}
            />

            <Divider height={sizes.spacing.xl} />

            <AppButton
              label="Verify"
              onPress={() => {
                setIsSheetOpen(true);
                bottomSheetRef.current?.snapToIndex(1);
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>

      {/* Bottom Sheet Success State */}
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={isSheetOpen ? CustomOverlayBackground : undefined}
        index={-1}
        enablePanDownToClose
        onChange={handleSheetChanges}
        snapPoints={['50%', '65%']}
        containerStyle={{ flex: 1 }}
        handleIndicatorStyle={{ backgroundColor: '#4D4D4D' }}
        enableDynamicSizing={false}
        android_keyboardInputMode="adjustResize">
        <BottomSheetScrollView
          style={styles.contentContainer}
          contentContainerStyle={[
            styles.scrollContentContainer,
            { paddingHorizontal: sizes.spacing.lg },
          ]}>
          <View className="items-center">
            <DoneIcon width={256} height={140} />
            <Divider height={sizes.spacing.lg} />
            <AppText fontSize={sizes.fonts.title} className="font-INTER_SEMIBOLD text-[#111827]">
              Password reset successful
            </AppText>
          </View>

          <Divider height={sizes.spacing.lg} />

          <AppButton
            label="Verify"
            onPress={() => {
              setIsSheetOpen(false);
              bottomSheetRef.current?.close();
              router.back();
            }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default ConfirmResetPassword;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    height: '100%',
  },
  scrollContentContainer: {
    flexGrow: 0.5,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
});
