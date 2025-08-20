import { forwardRef, memo, useEffect, useState, ReactNode } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { APP_COLOR } from '../constants/Color';

export interface MultilineInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string | boolean;
  success?: string | boolean;
  caption?: string | ReactNode;
  disabled?: boolean;
  inputClassName?: string;
  labelClassname?: string;
  isRequired?: boolean;
}

const AppMultilineInput = forwardRef<TextInput, MultilineInputProps>(
  (
    {
      label,
      value,
      placeholder,
      placeholderTextColor = APP_COLOR.PRIMARY_APP_TEXT,
      errorMessage,
      success = false,
      caption,
      onChangeText,
      disabled = false,
      onFocus,
      onBlur,
      isRequired = false,
      inputClassName,
      labelClassname,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showError, setShowError] = useState(!!errorMessage);
    const [isFilled, setIsFilled] = useState(false);

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

    const showBorder = showError
      ? 'border-ERROR_TEXT border-2'
      : isFocused || isFilled
        ? 'border-PRIMARY_COLOR border'
        : 'border-[#E6E6E6] border';

    const showTextColor = showError ? 'text-ERROR_STATE' : 'text-APP_TEXT';

    return (
      <View className="mb-4 flex flex-col">
        {label && (
          <Text
            className={[`mb-1 font-INTER_SEMIBOLD text-base text-[#1A1A1A]`, labelClassname].join(
              ' '
            )}>
            {label}
            {isRequired && <Text style={{ color: 'red' }}> *</Text>}
          </Text>
        )}

        <TextInput
          ref={ref}
          {...rest}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          numberOfLines={5}
          textAlignVertical="top" // <-- This ensures text starts at top
          className={[
            'placeholder-PLACEHOLDER_TEXT min-h-[120px] w-full rounded-lg px-4 py-3 text-sm',
            showBorder,
            showTextColor,
            inputClassName,
          ].join(' ')}
        />

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

export default memo(AppMultilineInput);
