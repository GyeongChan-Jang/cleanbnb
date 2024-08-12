import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CleaningTool {
  id: string;
  name: string;
  icon: string;
}

const cleaningTools: CleaningTool[] = [
  { id: '1', name: '청소도구', icon: 'broom' },
  { id: '2', name: '에어컨 또는 난로', icon: 'air-conditioner' },
  { id: '3', name: '엘리베이터', icon: 'elevator' },
  { id: '4', name: '와이파이', icon: 'wifi' },
  { id: '5', name: '주차', icon: 'car' },
  { id: '6', name: '인근의 빨래방', icon: 'washing-machine' },
];

const CleaningToolsScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { cleaningTools: selectedTools, setCleaningTools } = useAddPropertyStore();

  const toggleTool = (toolId: string) => {
    const updatedTools = selectedTools.includes(toolId)
      ? selectedTools.filter(id => id !== toolId)
      : [...selectedTools, toolId];
    setCleaningTools(updatedTools);
  };

  const renderToolCard = (item: CleaningTool) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.card, selectedTools.includes(item.id) && styles.selectedCard]}
      onPress={() => toggleTool(item.id)}>
      <Icon
        name={item.icon}
        size={24}
        color={selectedTools.includes(item.id) ? colors[theme].WHITE : colors[theme].BLACK}
      />
      <Text style={[styles.cardText, selectedTools.includes(item.id) && styles.selectedCardText]}>
        {item.name}
      </Text>
      <View style={styles.checkBox}>
        {selectedTools.includes(item.id) && (
          <Icon name="check-bold" size={20} color={colors[theme].WHITE} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>숙소에 구비된 물품을 선택하세요.</Text>
      <Text style={styles.subtitle}>클리너들에게 제공되는 물품은 어떤 것들이 있나요?</Text>
      <View style={styles.cardContainer}>{cleaningTools.map(renderToolCard)}</View>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors[theme].BLACK,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      color: colors[theme].GRAY_500,
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: colors[theme].GRAY_100,
    },
    selectedCard: {
      backgroundColor: colors[theme].SKY_MAIN,
    },
    cardText: {
      flex: 1,
      marginLeft: 10,
      fontSize: 18,
      color: colors[theme].BLACK,
    },
    selectedCardText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    checkBox: {
      width: 26,
      height: 26,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors[theme].GRAY_200,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CleaningToolsScreen;
