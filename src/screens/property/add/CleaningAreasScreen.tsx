import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CleaningArea {
  id: string;
  name: string;
  icon: string;
}

const cleaningAreas: CleaningArea[] = [
  { id: '1', name: '거실', icon: 'sofa' },
  { id: '2', name: '침실', icon: 'bed-empty' },
  { id: '3', name: '침구 교체', icon: 'bed' },
  { id: '4', name: '업무시설', icon: 'desk' },
  { id: '5', name: '주방', icon: 'stove' },
  { id: '6', name: '설거지', icon: 'dishwasher' },
  { id: '7', name: '냉장고', icon: 'fridge' },
  { id: '8', name: '화장실', icon: 'toilet' },
  { id: '9', name: '테라스', icon: 'balcony' },
  { id: '10', name: '드레스룸(옷장)', icon: 'wardrobe' },
  { id: '11', name: '수영장', icon: 'pool' },
  { id: '12', name: '헬스장', icon: 'dumbbell' },
  { id: '13', name: '바베큐장', icon: 'grill' },
  { id: '14', name: '야외 놀이터', icon: 'baby-face' },
  { id: '15', name: '야외 샤워시설', icon: 'shower' },
  { id: '16', name: '쓰레기 처리 및 분리수거', icon: 'recycle' },
  { id: '17', name: '세탁 및 건조', icon: 'washing-machine' },
  { id: '18', name: '어메니티(일회용품 등) 관리', icon: 'bottle-tonic' },
];

const CleaningAreaScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { cleaningAreas: selectedAreas, setCleaningAreas } = useAddPropertyStore();

  const toggleArea = (areaId: string) => {
    const updatedAreas = selectedAreas.includes(areaId)
      ? selectedAreas.filter(id => id !== areaId)
      : [...selectedAreas, areaId];
    setCleaningAreas(updatedAreas);
  };

  const renderAreaCard = (item: CleaningArea) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.card, selectedAreas.includes(item.id) && styles.selectedCard]}
      onPress={() => toggleArea(item.id)}>
      <View style={styles.cardContent}>
        <Icon
          name={item.icon}
          size={24}
          color={selectedAreas.includes(item.id) ? colors[theme].WHITE : colors[theme].BLACK}
        />
        <Text style={[styles.cardText, selectedAreas.includes(item.id) && styles.selectedCardText]}>
          {item.name}
        </Text>
      </View>
      <View style={[styles.checkBox, selectedAreas.includes(item.id) && styles.selectedCheckBox]}>
        {selectedAreas.includes(item.id) && (
          <Icon name="check-bold" size={20} color={colors[theme].WHITE} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>청소가 필요한 부분을 선택해주세요.</Text>
      <Text style={styles.subtitle}>클리너들에게 요청할 필수 청소 영역을 선택해주세요.</Text>
      <View style={styles.cardContainer}>{cleaningAreas.map(renderAreaCard)}</View>
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
      flexDirection: 'column',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: colors[theme].GRAY_100,
    },
    selectedCard: {
      backgroundColor: colors[theme].SKY_MAIN,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardText: {
      marginLeft: 10,
      fontSize: 18,
      color: colors[theme].BLACK,
    },
    selectedCardText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    checkBox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors[theme].GRAY_200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedCheckBox: {
      backgroundColor: colors[theme].SKY_MAIN,
      borderColor: colors[theme].WHITE,
    },
  });

export default CleaningAreaScreen;
