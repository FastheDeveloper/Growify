import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import React, { useState } from 'react';
// import AppIconSmall from '~/src/assets/svgs/AppIconSmall';
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

const Login = () => {
  const { sizes } = useResponsive();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const { error, data } = await login(email, password);

        if (error) {
          // Handle different types of auth errors
          let errorMessage = 'Try again.';

          if (error.message?.includes('Invalid login credentials')) {
            errorMessage = 'Invalid email or password. Please check your credentials.';
          } else if (error.message?.includes('Email not confirmed')) {
            errorMessage = 'Please check your email and click the confirmation link.';
          } else if (error.message?.includes('Too many requests')) {
            errorMessage = 'Too many login attempts. Please wait a moment.';
          } else if (error.message) {
            errorMessage = error.message;
          }

          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: errorMessage,
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome Back!',
          });

          // Navigation will be handled by auth state change, but we can also do it here
          router.replace('/(tabs)');
        }
      } catch (err) {
        console.error('Login error:', err);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Top Image Section */}
      <View className="relative flex-[0.55] bg-[#CBF3C9]">
        <Image
          source={require('~/src/assets/images/LoginImage.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      <View className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 shadow-lg">
        {/* Form */}
        <View className="mt-6 flex-1">
          <AppText fontSize={sizes.fonts.title} className="text-center font-INTER_BOLD">
            Login
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
                autoComplete="password"
                customShowIcon={<EyeOpenIcon width={20} height={20} />}
                customHideIcon={<EyeCloseIcon width={20} height={20} />}
                isRequired
                errorMessage={errors.password}
                editable={!loading}
              />

              <View className="mt-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <CheckBoxEmpty
                    width={20}
                    height={20}
                    onPress={toggleRememberMe}
                    // You might want to create a CheckBoxFilled component and conditionally render
                    style={{ opacity: rememberMe ? 1 : 0.5 }}
                  />
                  <AppText
                    onPress={toggleRememberMe}
                    fontSize={sizes.fonts.body}
                    className="text-REMEMBER_ME_TEXT font-INTER_MEDIUM">
                    Remember me
                  </AppText>
                </View>

                <AppText
                  onPress={() => {
                    if (!loading) {
                      router.navigate('/(auth)/resetPasswordEmail');
                    }
                  }}
                  fontSize={sizes.fonts.body}
                  className="font-INTER_MEDIUM text-SUCCESS"
                  style={{ opacity: loading ? 0.5 : 1 }}>
                  Forgot Password
                </AppText>
              </View>
            </View>

            {/* Footer Section */}
            <View>
              <Divider height={sizes.spacing.xxl} />
              <AppButton
                label={'Login'}
                onPress={handleLogin}
                disabled={loading}
                loading={loading}
                // Add loading state styling if your AppButton supports it
              />
              <Divider height={sizes.spacing.sm} />
              <AppText
                onPress={() => {
                  if (!loading) {
                    router.navigate('/(auth)/signUp');
                  }
                }}
                fontSize={sizes.fonts.medium}
                className="text-center font-INTER_REGULAR text-[#B3B3B3]"
                style={{ opacity: loading ? 0.5 : 1 }}>
                Don't have an account?{' '}
                <AppText fontSize={sizes.fonts.body} className="font-INTER_MEDIUM text-SUCCESS">
                  Signup
                </AppText>
              </AppText>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
