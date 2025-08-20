// src/components/PinInput.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  Keyboard,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { APP_COLOR } from '../constants/Color';

type PinInputProps = {
  length?: number;
  value?: string; // optional controlled value
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  boxSize?: number;
  boxStyle?: ViewStyle;
  inputStyle?: TextStyle;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  inputProps?: Partial<TextInputProps>;
};

const PinInput: React.FC<PinInputProps> = ({
  length = 4,
  value,
  onChange,
  onComplete,
  boxSize = 56,
  boxStyle,
  inputStyle,
  autoFocus = true,
  secureTextEntry = false,
  inputProps = {},
}) => {
  const [internal, setInternal] = useState<string[]>(() => Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);

  const refs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (typeof value === 'string') {
      const arr = value.slice(0, length).split('');
      const filled = Array.from({ length }, (_, i) => arr[i] ?? '');
      setInternal(filled);
    }
  }, [value, length]);

  const notify = (arr: string[]) => {
    const joined = arr.join('');
    onChange?.(joined);
    if (joined.length === length && !arr.includes('')) {
      onComplete?.(joined);
    }
  };

  const handleChange = (text: string, idx: number) => {
    // If paste detected (length > 1)
    if (text.length > 1) {
      const chars = text
        .replace(/[^0-9]/g, '')
        .slice(0, length)
        .split('');
      const filled = Array.from({ length }, (_, i) => chars[i] ?? '');
      setInternal(filled);
      notify(filled);
      if (chars.length === length) refs.current[length - 1]?.blur();
      else refs.current[chars.length]?.focus();
      return;
    }

    const char = text.replace(/[^0-9]/g, '');
    const next = [...internal];
    next[idx] = char;

    if (typeof value !== 'string') {
      setInternal(next);
    }

    if (char && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    } else if (char && idx === length - 1) {
      refs.current[idx]?.blur();
    }

    notify(next);
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, idx: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (internal[idx]) {
        const next = [...internal];
        next[idx] = '';
        if (typeof value !== 'string') setInternal(next);
        notify(next);
      } else if (idx > 0) {
        refs.current[idx - 1]?.focus();
        const next = [...internal];
        next[idx - 1] = '';
        if (typeof value !== 'string') setInternal(next);
        notify(next);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.row}>
        {Array.from({ length }).map((_, i) => (
          <TextInput
            key={`pin-${i}`}
            ref={(r) => (refs.current[i] = r)}
            value={internal[i]}
            onChangeText={(t) => handleChange(t, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            onFocus={() => setActiveIndex(i)}
            keyboardType="number-pad"
            maxLength={1}
            secureTextEntry={secureTextEntry}
            textContentType="oneTimeCode"
            autoFocus={autoFocus && i === 0}
            style={[
              styles.box,
              { width: boxSize, height: boxSize },
              activeIndex === i && { borderColor: APP_COLOR.PRIMARY },
              boxStyle,
              inputStyle && { padding: 0 },
            ]}
            textAlign="center"
            selectionColor="transparent"
            {...inputProps}
          />
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PinInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    fontSize: 22,
    padding: 0,
    textAlign: 'center',
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 1.38, height: 1.38 },
    shadowOpacity: 0.1,
    shadowRadius: 2.75,
    // Shadow (Android)
    elevation: 2,
  },
});
