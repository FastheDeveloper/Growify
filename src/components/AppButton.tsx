import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  PressableProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { APP_COLOR } from '../constants/Color';

interface AppButtonProps extends PressableProps {
  loading?: boolean;
  leftIcon?: React.ComponentProps<typeof FontAwesome5>['name'] | React.ReactElement;
  label: string;
  rightIcon?: React.ComponentProps<typeof FontAwesome5>['name'] | React.ReactElement;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
  isTextBlack?: boolean;
  variant?: 'primary' | 'secondary';
  py?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  loading,
  leftIcon,
  label,
  rightIcon,
  style,
  textStyle,
  className = '',
  isTextBlack = false,
  variant = 'primary',
  py = 'py-4',
  ...pressableProps
}) => {
  const isSecondary = variant === 'secondary';

  const renderIcon = (
    icon: React.ComponentProps<typeof FontAwesome5>['name'] | React.ReactElement,
    extraClass: string
  ) => {
    if (React.isValidElement(icon)) {
      return <View className={extraClass}>{icon}</View>;
    } else if (typeof icon === 'string') {
      return (
        <View className={extraClass}>
          <FontAwesome5
            name={icon}
            size={20}
            color={textStyle?.color || (isSecondary ? APP_COLOR.PRIMARY : '#fff')}
          />
        </View>
      );
    }
    return null;
  };

  const content = loading ? (
    <View className="h-6 justify-center">
      <ActivityIndicator
        size="small"
        color={textStyle?.color || (isSecondary ? APP_COLOR.PRIMARY : '#fff')}
        animating={true}
      />
    </View>
  ) : (
    <>
      {leftIcon && renderIcon(leftIcon, 'absolute left-5')}
      <Text
        className={`${
          isSecondary
            ? 'text-PRIMARY_APP_TEXT '
            : pressableProps.disabled
              ? 'text-[#999999]'
              : 'text-white'
        } text-center  font-INTER_SEMIBOLD text-base`}
        style={[textStyle]}>
        {label}
      </Text>
      {rightIcon && renderIcon(rightIcon, 'absolute right-5')}
    </>
  );

  const baseClassName = 'flex-row justify-center items-center px-5   rounded-lg';
  const variantClassName = pressableProps.disabled
    ? 'bg-[##E6E6E6]'
    : isSecondary
      ? 'bg-transparent'
      : 'bg-PRIMARY';
  return (
    <Pressable
      className={`${baseClassName} ${variantClassName} ${className} ${py} `}
      style={style}
      {...pressableProps}>
      {content}
    </Pressable>
  );
};

export default AppButton;
