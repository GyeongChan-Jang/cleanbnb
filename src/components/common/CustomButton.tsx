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
}

const deviceHeight = Dimensions.get('screen').height;

// Dimensions.get('screen') - 안드로이드는 상단 상태표시바까지 포함하는 스크린 크기
const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  isValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: CustomButtonProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      disabled={isValid}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles[size],
        isValid && styles.isValid,
        style,
      ]}
      {...props}>
      <View style={styles[size]}>
        {icon}
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{label}</Text>
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
    },
    isValid: {
      opacity: 0.5,
    },
    filled: {
      backgroundColor: colors[theme].SKY_600,
    },
    outlined: {
      borderColor: colors[theme].SKY_600,
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
      backgroundColor: colors[theme].SKY_400,
    },
    outlinedPressed: {
      backgroundColor: colors[theme].SKY_600,
      borderWidth: 1,
      opacity: 0.5,
    },
    text: {
      fontSize: 16,
      fontWeight: '700',
    },
    filledText: {
      color: 'white',
    },
    outlinedText: {
      color: colors[theme].SKY_600,
    },
  });

export default CustomButton;
