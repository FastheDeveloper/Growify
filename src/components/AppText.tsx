import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ResponsiveTextProps extends TextProps {
  className?: string;
  fontSize?: number;
}

const AppText: React.FC<ResponsiveTextProps> = ({
  className,
  fontSize,
  style,
  children,
  ...rest
}) => {
  return (
    <Text className={className} style={[style, fontSize ? { fontSize } : undefined]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
