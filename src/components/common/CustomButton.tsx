import React, { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  PressableProps,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/constants';
import { ThemeMode } from '@/types/common';
import useThemeStore from '@/store/useThemeStore';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  isValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  disabled?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  isValid = false,
  style = null,
  textStyle = null,
  icon = null,
  disabled = false,
  ...props
}: CustomButtonProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      disabled={disabled || isValid}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles[size],
        isValid && styles.isValid,
        disabled && styles.disabled,
        style,
      ]}
      {...props}>
      <View style={styles[size]}>
        {icon}
        <Text
          style={[
            styles.text,
            styles[`${variant}Text`],
            disabled && styles.disabledText,
            textStyle,
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    isValid: {
      opacity: 0.5,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_300,
      borderColor: colors[theme].GRAY_300,
    },
    filled: {
      backgroundColor: colors[theme].DARK_MAIN,
    },
    outlined: {
      borderColor: colors[theme].DARK_MAIN,
      borderWidth: 1,
    },
    large: {
      width: '100%',
      paddingVertical: deviceHeight > 700 ? 15 : 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: 50,
      gap: 5,
    },
    medium: {
      width: '50%',
      paddingVertical: deviceHeight > 700 ? 12 : 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: 50,
      gap: 5,
    },
    filledPressed: {
      backgroundColor: colors[theme].DARK_MAIN,
      opacity: 0.7,
    },
    outlinedPressed: {
      backgroundColor: colors[theme].DARK_MAIN,
      borderWidth: 1,
      opacity: 0.5,
    },
    text: {
      fontSize: 18,
      fontWeight: '700',
    },
    filledText: {
      color: 'white',
    },
    outlinedText: {
      color: colors[theme].DARK_MAIN,
    },
    disabledText: {
      color: colors[theme].GRAY_500,
    },
  });

export default CustomButton;
