import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';

interface PropertyBottomTabProps {
  onNext: () => void;
  isNextDisabled?: boolean;
}

const PropertyBottomTab = ({ onNext, isNextDisabled = false }: PropertyBottomTabProps) => {
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>뒤로</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        style={[styles.button, isNextDisabled && styles.disabledButton]}
        disabled={isNextDisabled}>
        <Text style={[styles.buttonText, isNextDisabled && styles.disabledButtonText]}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: colors[theme].WHITE,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: colors[theme].BLUE_500,
    },
    buttonText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    disabledButton: {
      backgroundColor: colors[theme].GRAY_300,
    },
    disabledButtonText: {
      color: colors[theme].GRAY_500,
    },
  });

export default PropertyBottomTab;
