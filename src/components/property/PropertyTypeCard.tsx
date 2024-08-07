import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PropertyTypeCardProps {
  type: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
}

const PropertyTypeCard = ({ type, icon, isSelected, onPress }: PropertyTypeCardProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <TouchableOpacity style={[styles.card, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={30} color={isSelected ? colors[theme].SKY_MAIN : '#484848'} />
      </View>
      <Text style={[styles.typeText, isSelected && styles.selectedText]}>{type}</Text>
    </TouchableOpacity>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    card: {
      width: '45%',
      aspectRatio: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    selectedCard: {
      borderColor: colors[theme].SKY_MAIN,
      backgroundColor: colors[theme].SKY_100,
    },
    iconContainer: {
      marginBottom: 8,
    },
    typeText: {
      fontSize: 20,
      color: '#484848',
      textAlign: 'center',
    },
    selectedText: {
      color: colors[theme].SKY_MAIN,
      fontWeight: 'bold',
    },
  });

export default PropertyTypeCard;
