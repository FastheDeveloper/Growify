import React, { ReactNode, useState } from 'react';
import { View, I18nManager, StyleSheet, Text } from 'react-native';
import PhoneInput, {
  PhoneInputProps,
  ICountry,
  IPhoneInputRef,
  isValidPhoneNumber,
} from 'react-native-international-phone-number';

import { APP_COLOR } from '../constants/Color';
import AppText from './AppText';

interface DynamicPhoneInputProps extends Omit<Partial<PhoneInputProps & IPhoneInputRef>, 'theme'> {
  label?: string;
  value: string; // required
  onChangePhoneNumber: (phoneNumber: string) => void;
  onChangeSelectedCountry: (country: ICountry) => void;
  errorMessage?: string | boolean;
  caption?: string;
  isRequired?: boolean;
  customCaret?: () => ReactNode;
}

const DynamicPhoneInput: React.FC<DynamicPhoneInputProps> = ({
  label,
  value,
  onChangePhoneNumber,
  selectedCountry,
  onChangeSelectedCountry,
  onFocus,
  onBlur,
  placeholder,
  errorMessage,
  caption,
  isRequired = false,
  customCaret,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(!!errorMessage);

  const handleBlur = () => {
    setIsFocused(false);
    if (selectedCountry) {
      const isValid = isValidPhoneNumber(value, selectedCountry);

      setShowError(!isValid || !!errorMessage);
    }
    // onBlur?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowError(false);
    onFocus?.();
  };

  const showBorder = showError
    ? APP_COLOR.ERROR_TEXT
    : isFocused || value
      ? APP_COLOR.PRIMARY_COLOR
      : '#E6E6E6';

  const phoneInputStyles = {
    container: {
      borderWidth: showError ? 2 : 1,
      borderColor: showBorder,
      borderRadius: 8,
      height: 48,
      //   paddingHorizontal: 4,
      backgroundColor: 'transparent',
    },
    flagContainer: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      paddingLeft: 8,
      paddingRight: 4,
      backgroundColor: 'transparent',
    },
    callingCode: {
      fontSize: 14,
      color: APP_COLOR.PRIMARY_APP_TEXT,
    },
    input: {
      fontSize: 14,
      color: APP_COLOR.PRIMARY_APP_TEXT,
    },
    divider: {
      backgroundColor: 'transparent',
    },
  };

  const modalStyles = {
    searchInput: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E6E6E6',
      color: APP_COLOR.PRIMARY_APP_TEXT,
      paddingHorizontal: 12,
      height: 46,
      fontSize: 14,
    },
  };

  return (
    <View className="mb-4 flex flex-col">
      {label && (
        <AppText style={styles.label}>
          {label}
          {isRequired && <AppText style={{ color: 'red' }}> *</AppText>}
        </AppText>
      )}
      <PhoneInput
        value={value}
        onChangePhoneNumber={onChangePhoneNumber}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={onChangeSelectedCountry}
        phoneInputStyles={phoneInputStyles}
        modalStyles={modalStyles}
        placeholder={placeholder}
        popularCountries={['NG']}
        rtl={I18nManager.isRTL}
        onFocus={handleFocus}
        onBlur={handleBlur}
        customCaret={customCaret}
        {...props}
        defaultCountry="NG"
      />
      {(showError || caption) && (
        <AppText
          style={[
            styles.caption,
            {
              color: showError ? APP_COLOR.ERROR_TEXT : APP_COLOR.PRIMARY_APP_TEXT,
            },
          ]}>
          {showError ? errorMessage || 'Invalid phone number' : caption}
        </AppText>
      )}
    </View>
  );
};

export default DynamicPhoneInput;

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  caption: {
    marginTop: 4,
    fontSize: 12,
  },
});
