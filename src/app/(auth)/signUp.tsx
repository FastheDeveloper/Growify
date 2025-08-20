import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

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
  const { signup, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const { error, data } = await signup(email, password);

        if (error) {
          // Handle different types of signup errors
          let errorMessage = 'Please try again.';

          if (error.message?.includes('already registered')) {
            errorMessage = 'An account with this email already exists.';
          } else if (error.message?.includes('Password should be at least')) {
            errorMessage = 'Password must be at least 6 characters long.';
          } else if (error.message?.includes('Invalid email')) {
            errorMessage = 'Please enter a valid email address.';
          } else if (error.message?.includes('signup is disabled')) {
            errorMessage = 'Account creation is temporarily disabled.';
          } else if (error.message) {
            errorMessage = error.message;
          }

          Toast.show({
            type: 'error',
            text1: 'Signup Failed',
            text2: errorMessage,
          });
        } else {
          // Check if email confirmation is required
          if (!data.session && data.user && !data.user.email_confirmed_at) {
            Toast.show({
              type: 'info',
              text1: 'Check Your Email',
              text2: 'We sent you a confirmation link. Please check your email.',
            });
            // Navigate to email confirmation screen or back to login
            router.replace('/(auth)/login');
          } else {
            // Account created and logged in immediately
            Toast.show({
              type: 'success',
              text1: 'Account Created!',
              text2: 'Welcome to the app!',
            });

            // Navigate to onboarding
            router.replace('/(auth)/signupOnboarding');
          }
        }
      } catch (err) {
        console.error('Signup error:', err);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };

  const toggleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
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
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                isRequired
                errorMessage={errors.email}
                editable={!loading}
              />
              <Divider height={sizes.spacing.padding} />

              <AppInput
                label="Password"
                placeholder="*******"
                passwordToggle
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoComplete="password-new"
                customShowIcon={<EyeOpenIcon width={20} height={20} />}
                customHideIcon={<EyeCloseIcon width={20} height={20} />}
                isRequired
                errorMessage={errors.password}
                editable={!loading}
              />
              <Divider height={sizes.spacing.padding} />

              <AppInput
                label="Confirm Password"
                placeholder="*******"
                passwordToggle
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoComplete="password-new"
                customShowIcon={<EyeOpenIcon width={20} height={20} />}
                customHideIcon={<EyeCloseIcon width={20} height={20} />}
                isRequired
                errorMessage={errors.confirmPassword}
                editable={!loading}
              />

              {/* Terms and Conditions */}
            </View>

            {/* Footer Section */}
            <View>
              <AppButton
                label={'Signup'}
                onPress={handleSignup}
                disabled={loading}
                loading={loading}
                // Add opacity styling for disabled state if your AppButton supports it
                style={{ opacity: 1 }}
              />
              <Divider height={sizes.spacing.sm} />
              <AppText
                fontSize={sizes.fonts.medium}
                className="text-center font-INTER_REGULAR text-[#B3B3B3]"
                style={{ opacity: loading ? 0.5 : 1 }}>
                Already have an account?{' '}
                <AppText
                  onPress={() => {
                    if (!loading) {
                      router.navigate('/(auth)/login');
                    }
                  }}
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
