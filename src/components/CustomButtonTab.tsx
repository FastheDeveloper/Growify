// CustomBottomTab.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TabBarIcon } from './TabBarIcon';
import HomeIcon from '../assets/svgs/HomeIcon';
import ProfileTab from '../assets/svgs/ProfileTab';
import { APP_COLOR } from '../constants/Color';
import { FONT_NAMES } from '../constants/fontNames';

interface TabConfig {
  name: string;
  title: string;
  icon: React.ReactNode | React.ComponentProps<typeof FontAwesome>['name'];
}

const CustomBottomTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  interface TabConfig {
    name: string;
    title: string;
    icon: (color: string) => React.ReactNode;
  }

  const tabs: TabConfig[] = [
    {
      name: 'index',
      title: 'Home',
      icon: (color) => <HomeIcon width={18} height={18} color={color} />,
    },

    {
      name: 'profile',
      title: 'Profile',
      icon: (color) => <ProfileTab width={18} height={18} color={color} />,
    },
  ];
  return (
    <View style={[styles.tabContainer, { bottom: insets.bottom + 16 }]}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        const route = state.routes[index];

        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = (): void => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={tab.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={descriptors[route.key]?.options.tabBarAccessibilityLabel}
            // testID={descriptors[route.key]?.options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, isFocused ? styles.activeTab : styles.inactiveTab]}>
            {/* <TabBarIcon name={tab.icon} color={isFocused ? 'white' : '#666'} />
             */}
            {tab.icon(isFocused ? 'white' : '#B3B3B3')}
            <Text style={[styles.tabText, { color: isFocused ? 'white' : '#B3B3B3' }]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 45,
    padding: 2,
    marginBottom: 18,
    // height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 1,
    borderRadius: 35,
    minHeight: 44,
  },
  activeTab: {
    backgroundColor: APP_COLOR.PRIMARY,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    // fontWeight: '600',

    marginLeft: 6,
    fontFamily: FONT_NAMES.INTER_MEDIUM,
  },
});

export default CustomBottomTab;
