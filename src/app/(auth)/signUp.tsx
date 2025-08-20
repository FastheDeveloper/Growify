import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import AppIconSmall from '~/src/assets/svgs/AppIconSmall';
import AppText from '~/src/components/AppText';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import AppInput from '~/src/components/AppInput';
import EyeOpenIcon from '~/src/assets/svgs/EyeOpenIcon';
import EyeCloseIcon from '~/src/assets/svgs/EyeCloseIcon';
import CheckBoxEmpty from '~/src/assets/svgs/CheckBoxEmpty';
import { Divider } from '~/src/components/Divider';
import AppButton from '~/src/components/AppButton';
import { useAuth } from '~/src/hooks/useAuth';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StatusBar } from 'expo-status-bar';

const Signup = () => {
  const { sizes } = useResponsive();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      login({ email, password }).then(() => {
        router.replace('/(auth)/signupOnboarding');
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Top Image Section */}
      <View className="relative flex-[0.55] bg-[#CBF3C9]">
        <Image
          source={require('~/src/assets/images/SignUpImage.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      <View className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 shadow-lg">
        {/* Form */}
        <View className="mt-6 flex-1">
          <AppText fontSize={sizes.fonts.title} className="text-center font-INTER_BOLD">
            Signup
          </AppText>
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_MEDIUM text-gray-500">
            Empower Your Journey. Start Today!
          </AppText>

          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={{ paddingTop: sizes.spacing.xl }}>
              <AppInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                isRequired
                errorMessage={errors.email}
              />
              <Divider height={sizes.spacing.padding} />

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
            </View>

            {/* Footer Section */}
            <View>
              <Divider height={sizes.spacing.xxl} />
              <AppButton label="Signup" onPress={handleLogin} />
              <Divider height={sizes.spacing.sm} />
              <AppText
                fontSize={sizes.fonts.medium}
                className="text-center font-INTER_REGULAR text-[#B3B3B3]">
                Already have an account?{' '}
                <AppText
                  onPress={() => router.navigate('/(auth)/login')}
                  fontSize={sizes.fonts.body}
                  className="font-INTER_MEDIUM text-SUCCESS">
                  Login
                </AppText>
              </AppText>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
