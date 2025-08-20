import '../../global.css';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { ResponsiveProvider } from '../components/ResponsiveProvider';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContextProvider } from '../hooks/useAuth';
import { BottomSheetProvider } from '../hooks/useBottomSheet';
import { Stack } from 'expo-router';
import { StreakProvider } from '../providers/streakContext';

SplashScreen.hideAsync();
const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', backgroundColor: '#333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#ddd' }}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545', backgroundColor: '#333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#ddd' }}
    />
  ),
};

function AppContent() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <AuthContextProvider>
        <StreakProvider>
          <ResponsiveProvider>
            <BottomSheetProvider>
              <AppContent />
              <Toast config={toastConfig} />
            </BottomSheetProvider>
          </ResponsiveProvider>
        </StreakProvider>
      </AuthContextProvider>
    </KeyboardProvider>
  );
}
