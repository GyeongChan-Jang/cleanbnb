import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

interface FloatingButtonProps {
  scrollY: Animated.Value;
  text: string;
  onPress?: () => void;
}

const FloatingButton = ({ scrollY, text, onPress }: FloatingButtonProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const [showText, setShowText] = useState(true);
  const buttonWidth = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    const listener = scrollY.addListener(({ value }: { value: number }) => {
      if (value > 20) {
        Animated.spring(buttonWidth, {
          toValue: 60,
          useNativeDriver: false,
          tension: 50,
          friction: 7,
        }).start(() => setShowText(false));
      } else {
        setShowText(true);
        Animated.spring(buttonWidth, {
          toValue: 120,
          useNativeDriver: false,
          tension: 50,
          friction: 7,
        }).start();
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  return (
    <Animated.View style={[styles.floatingButton, { width: buttonWidth }]}>
      <TouchableOpacity onPress={onPress && onPress} style={styles.buttonContent}>
        <Entypo name="plus" size={showText ? 36 : 40} color="white" />
        {showText && (
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: colors[theme].SKY_MAIN,
      borderRadius: 30,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    textContainer: {
      width: 60,
      marginLeft: 2,
    },
    buttonText: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  });

export default FloatingButton;
