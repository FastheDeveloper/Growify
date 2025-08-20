import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import AppText from '../components/AppText';

export default function Modal() {
  return (
    <>
      <AppText>sds</AppText>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
