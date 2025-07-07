import React from 'react';
import { Text, TextProps } from 'react-native';
import { FontWeight, getFont } from '../constants/fonts';

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  children: React.ReactNode;
}

export default function CustomText({ 
  weight = 'regular', 
  size = 'base',
  style,
  children,
  ...props 
}: CustomTextProps) {
  const fontSize = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  }[size];

  return (
    <Text
      style={[
        {
          fontFamily: getFont(weight),
          fontSize,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

// Predefined text components for common use cases
export const Heading1 = (props: Omit<CustomTextProps, 'weight' | 'size'>) => (
  <CustomText weight="bold" size="4xl" {...props} />
);

export const Heading2 = (props: Omit<CustomTextProps, 'weight' | 'size'>) => (
  <CustomText weight="semiBold" size="3xl" {...props} />
);

export const Heading3 = (props: Omit<CustomTextProps, 'weight' | 'size'>) => (
  <CustomText weight="semiBold" size="2xl" {...props} />
);

export const BodyText = (props: Omit<CustomTextProps, 'weight' | 'size'>) => (
  <CustomText weight="regular" size="base" {...props} />
);

export const CaptionText = (props: Omit<CustomTextProps, 'weight' | 'size'>) => (
  <CustomText weight="light" size="sm" {...props} />
);

export const ButtonText = (props: Omit<CustomTextProps, 'weight' | 'size'>) => (
  <CustomText weight="semiBold" size="base" {...props} />
); 