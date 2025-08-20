import { forwardRef, memo, ReactNode, useEffect, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { APP_COLOR } from '../constants/Color';

import { useResponsive } from './ResponsiveProvider';

export interface BaseInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string | boolean;
  success?: string | boolean;
  caption?: string | ReactNode;
  disabled?: boolean;
  passwordIconSize?: number;
  passwordToggle?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  customShowIcon?: ReactNode; // e.g. <FasIcon />
  customHideIcon?: ReactNode;
  inputClassName?: string;
  labelClassname?: string;
  isRequired?: boolean;
}

const BaseInput = forwardRef<TextInput, BaseInputProps>(
  (
    {
      label,
      value,
      placeholder,
      placeholderTextColor = APP_COLOR.TEXT_PRIMARY,
      errorMessage,
      success = false,
      caption,
      onChangeText,
      disabled = false,
      onFocus,
      onBlur,
      multiline = false,
      numberOfLines = 1,
      secureTextEntry = false,
      passwordToggle = false,
      passwordIconSize = 22,
      leftIcon,
      rightIcon,
      customShowIcon, // e.g. <FasIcon />
      customHideIcon,
      inputClassName,
      labelClassname,
      isRequired = false,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showError, setShowError] = useState(!!errorMessage);
    console.log('====================================');
    console.log(errorMessage);
    console.log('====================================');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { sizes } = useResponsive();
    useEffect(() => {
      setShowError(!isFocused && !!errorMessage);
    }, [errorMessage, isFocused]);

    useEffect(() => {
      setIsFilled(!!value?.toString().trim());
    }, [value]);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      setShowError(false);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      setIsFilled(!!value?.toString().trim());
      setShowError(!!errorMessage);
      onBlur?.(e);
    };

    const togglePassword = () => setIsPasswordVisible((prev) => !prev);

    const showBorder = showError
      ? 'border-ERROR border-2'
      : isFocused || isFilled
        ? 'border-PRIMARY border'
        : 'border-[#E6E6E6] border';

    const showTextColor = showError ? 'text-ERROR_STATE' : 'text-APP_TEXT';

    return (
      <View className="mb-4 flex flex-col ">
        {label && (
          <Text
            className={[`mb-1   font-INTER_SEMIBOLD text-base text-[#1A1A1A]`, labelClassname].join(
              ' '
            )}>
            {label}
            {isRequired && <Text style={{ color: 'red' }}> * </Text>}
          </Text>
        )}

        <View className="relative">
          {leftIcon && (
            <View className="absolute bottom-0 left-4 top-0 z-10 justify-center">{leftIcon}</View>
          )}

          <TextInput
            ref={ref}
            {...rest}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            multiline={multiline}
            numberOfLines={numberOfLines}
            scrollEnabled={multiline}
            className={[
              'placeholder-PLACEHOLDER_TEXT  w-full rounded-lg px-4 py-3 text-sm ',
              leftIcon ? 'pl-10' : '',
              rightIcon || passwordToggle ? 'pr-10' : '',
              disabled ? '' : '',
              multiline ? 'text-top min-h-[200px]' : 'min-h-[48px]',
              showBorder,
              showTextColor,
              inputClassName,
            ].join(' ')}
          />
          {passwordToggle && secureTextEntry ? (
            rightIcon ? (
              // If rightIcon is passed with password toggle, show it but still toggle password
              <TouchableOpacity
                className="absolute bottom-0 right-4 top-0 justify-center"
                onPress={togglePassword}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {rightIcon}
              </TouchableOpacity>
            ) : (
              // Show custom visibility toggle icons if provided
              <TouchableOpacity
                className="absolute bottom-0 right-4 top-0 justify-center"
                onPress={togglePassword}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {isPasswordVisible
                  ? (customHideIcon ?? (
                      <Ionicons
                        name="eye-off-outline"
                        size={passwordIconSize}
                        color={showError ? APP_COLOR.ERROR : '#065FB2'}
                      />
                    ))
                  : (customShowIcon ?? (
                      <Ionicons
                        name="eye-outline"
                        size={passwordIconSize}
                        color={showError ? APP_COLOR.ERROR : '#065FB2'}
                      />
                    ))}
              </TouchableOpacity>
            )
          ) : rightIcon ? (
            <View className="absolute bottom-0 right-4 top-0 justify-center">{rightIcon}</View>
          ) : null}
        </View>

        {(showError || caption || success) && (
          <Text
            className={[
              'mt-2 text-xs',
              showError
                ? 'text-ERROR_TEXT'
                : success
                  ? 'text-PRIMARY_COLOR'
                  : 'text-PLACEHOLDER_TEXT',
            ].join(' ')}>
            {showError ? errorMessage : caption}
          </Text>
        )}
      </View>
    );
  }
);

export default memo(BaseInput);
