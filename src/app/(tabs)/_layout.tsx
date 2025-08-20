import { Link, Redirect, Tabs } from 'expo-router';
import CustomBottomTab from '~/src/components/CustomButtonTab';
import { useAuth } from '~/src/hooks/useAuth';

export default function TabLayout() {
  const { session, isReady } = useAuth();
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomBottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      {/* <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} /> */}
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
