import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { APP_COLOR } from '../constants/Color';
import { Divider } from './Divider';
import AppText from './AppText';

interface Item {
  title: string;
  //   icon: React.ComponentType<{ width: number; height: number }>;
}

interface SelectorDropdownProps {
  data: Item[];
  placeholder: string;
  label: string;
  onValueChange?: (item: Item | null) => void;
  isRequired?: boolean;
  errorMessage?: string;
  toValue?: number;
  initialValue?: Item; // 👈 NEW: Added initialValue prop
}

const AnimatedPicker: React.FC<SelectorDropdownProps> = ({
  data,
  placeholder = 'Select Item',
  toValue = 100,
  label,
  isRequired = false,
  errorMessage,
  onValueChange,
  initialValue, // 👈 NEW: Destructure initialValue
}) => {
  const [selectedValue, setSelectedValue] = useState<Item | null>(initialValue || null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const pickerHeight = useRef(new Animated.Value(0)).current;

  // 👈 NEW: Effect to handle initialValue changes
  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
      // Also notify parent component of the initial value
      onValueChange?.(initialValue);
    }
  }, [initialValue]);

  const togglePicker = () => {
    if (isPickerVisible) {
      Animated.timing(pickerHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setPickerVisible(false));
    } else {
      setPickerVisible(true);
      Animated.timing(pickerHeight, {
        toValue: toValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const selectItem = (item: Item) => {
    setSelectedValue(item);
    onValueChange?.(item);
    togglePicker();
  };

  const isFilled = !!selectedValue;
  const isFocused = isPickerVisible;
  const showError = !!errorMessage;

  const borderColor = showError
    ? APP_COLOR.ERROR
    : isFocused || isFilled
      ? APP_COLOR.PRIMARY
      : '#E6E6E6';

  const textColor = showError ? APP_COLOR.ERROR : APP_COLOR.TEXT_PRIMARY;

  return (
    <View className="w-full">
      {/* Label */}
      <Text className="mb-1 font-INTER_SEMIBOLD text-base text-[#1A1A1A]">
        {label}
        {isRequired && <Text style={{ color: APP_COLOR.ERROR }}> *</Text>}
      </Text>

      {/* Input Field */}
      <TouchableOpacity onPress={togglePicker} activeOpacity={0.7}>
        <View
          className="flex-row items-center rounded-lg px-3 py-4"
          style={{
            borderColor,
            borderWidth: isFocused || isFilled || showError ? 2 : 1,
            // backgroundColor: theme.colors.inputBackground,
            borderBottomWidth: isPickerVisible ? 0 : undefined,
            borderBottomRightRadius: isPickerVisible ? 0 : 8,
            borderBottomLeftRadius: isPickerVisible ? 0 : 8,
          }}>
          <Text
            className="flex-1 text-base"
            style={{
              color: !selectedValue?.title ? '#CCCCCC' : APP_COLOR.TEXT_PRIMARY,
            }}>
            {selectedValue?.title || placeholder}
          </Text>

          <AntDesign
            name={isPickerVisible ? 'close' : 'down'}
            size={18}
            color={APP_COLOR.TEXT_PRIMARY}
            style={{ marginRight: '3%' }}
          />
        </View>
      </TouchableOpacity>

      {/* Error Message */}
      {showError && (
        <Text className="mt-1 text-xs" style={{ color: APP_COLOR.ERROR }}>
          {errorMessage}
        </Text>
      )}

      {/* Animated Dropdown */}
      {isPickerVisible && (
        <Animated.View
          className="overflow-hidden rounded-b-lg"
          style={{
            height: pickerHeight,
            borderColor,
            borderWidth: 2,
            backgroundColor: 'white', // Changed from 'RED' to 'white'
            borderTopWidth: 0,
          }}>
          <Divider height={10} />
          {data.map((item, index) => (
            <TouchableOpacity key={index.toString()} onPress={() => selectItem(item)}>
              <View className="ml-2 flex-row items-center px-2 py-2">
                <AppText>{item.title}</AppText>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export default AnimatedPicker;
