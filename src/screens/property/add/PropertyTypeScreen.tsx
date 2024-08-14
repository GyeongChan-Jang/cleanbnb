import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeMode } from '@/types/common';
import { addPropertyNavigations, colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import PropertyTypeCard from '@/components/property/PropertyTypeCard';
import { PropertyType } from '@/types/property';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { AddPropertyTabParamList } from '@/navigation/tab/AddPropertyTabNavigator';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const propertyTypes: PropertyType[] = [
  { id: '1', type: '아파트', icon: 'business-outline' },
  { id: '2', type: '주택', icon: 'home' },
  { id: '3', type: '별장', icon: 'easel-sharp' },
  { id: '4', type: '호텔', icon: 'bed' },
  { id: '5', type: '오피스텔', icon: 'business-sharp' },
  { id: '6', type: '캠핑카', icon: 'car' },
  { id: '7', type: '펜션', icon: 'home' },
  { id: '8', type: '풀빌라', icon: 'business' },
  { id: '9', type: '글램핑장', icon: 'business' },
  { id: '10', type: '텐트', icon: 'business' },
  { id: '11', type: '농장', icon: 'business' },
  { id: '12', type: '회사', icon: 'business' },
  { id: '13', type: '빌딩', icon: 'business' },
];

const PropertyTypeScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<AddPropertyTabParamList>>();
  const { propertyType, setPropertyType } = useAddPropertyStore();

  const renderItem = ({ item }: { item: PropertyType }) => (
    <PropertyTypeCard
      type={item.type}
      icon={item.icon}
      isSelected={propertyType === item.id}
      onPress={() => setPropertyType(item.id)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      onNextPress: () => {
        navigation.navigate(addPropertyNavigations.COMPLETE);
      },
    } as Partial<StackNavigationOptions>);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>숙소 유형을 선택해주세요.</Text>
      </View>
      <FlatList
        data={propertyTypes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default PropertyTypeScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      padding: 20,
    },
    headerText: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
    listContent: {
      padding: 10,
    },
  });
