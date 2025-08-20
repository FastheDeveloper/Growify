import { useRef, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { FONT_NAMES } from '@constants/fontNames';
// import { STORAGE_KEYS } from '@constants/asyncKeys';
import { getValueFor } from '@utils/secureStorage';
import { StatusBar } from 'expo-status-bar';
import AppLogo from '../assets/svgs/AppIcon';

import SplashSvg from '../assets/svgs/SplashSvg';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import AppName from '../assets/svgs/AppName';
import { useAuth } from '../hooks/useAuth';
import { STORAGE_KEYS } from '../constants/asyncKeys';
import AppText from '../components/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const animation = useRef<LottieView>(null);

  const { session, isReady } = useAuth();
  const [fontsLoaded] = useFonts({
    [FONT_NAMES.INTER_REGULAR]: Inter_400Regular,
    [FONT_NAMES.INTER_MEDIUM]: Inter_500Medium,
    [FONT_NAMES.INTER_SEMIBOLD]: Inter_600SemiBold,
    [FONT_NAMES.INTER_BOLD]: Inter_700Bold,
    [FONT_NAMES.INTER_BLACK]: Inter_900Black,
  });

  const [hasNavigated, setHasNavigated] = useState(false);

  const checkOnboardingStatus = async () => {
    try {
      const hasLaunched = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      return !!hasLaunched;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Wait until fonts and auth are ready

    if (!isReady || !fontsLoaded || hasNavigated) return;

    const proceed = async () => {
      const hasUsedApp = await checkOnboardingStatus();

      setTimeout(() => {
        if (!hasUsedApp) {
          console.log('====================================');
          console.log('here');
          console.log('====================================');
          router.replace('/(auth)/onboarding');
        } else if (session) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
        setHasNavigated(true);
      }, 5000); // Let animation play out a bit before navigating
    };

    proceed();
  }, [isReady, fontsLoaded]);

  return (
    <View className="flex-1 justify-center bg-PRIMARY">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />

      <View className="items-center " style={{}}>
        <AppLogo width={418} height={418} />
      </View>
      <View className="items-center">
        <AppText className="font-INTER_SEMIBOLD text-white">Your day begins here!</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
