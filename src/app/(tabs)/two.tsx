import { Stack } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import AppText from '~/src/components/AppText';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        <AppText>2</AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
