import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { addPropertyNavigations, colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { AddPropertyTabParamList } from '@/navigation/tab/AddPropertyTabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PricingScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<AddPropertyTabParamList>>();
  const { pricing, setPricing } = useAddPropertyStore();
  const [price, setPrice] = useState(pricing.toString());
  const inputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePriceChange = (text: string) => {
    const numericPrice = text.replace(/[^0-9]/g, '');
    setPrice(numericPrice);
    setPricing(parseInt(numericPrice, 10) || 0);
  };

  const handleSavePricing = () => {
    // 여기에 저장 로직 추가
    setIsLoading(true);
    console.log('Pricing saved:', pricing);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(addPropertyNavigations.COMPLETE);
    }, 3000);
  };

  useEffect(() => {
    navigation.setOptions({
      onNextPress: handleSavePricing,
    } as Partial<StackNavigationOptions>);
  }, [navigation, pricing]);

  useEffect(() => {
    // 화면에 진입하자마자 포커스 설정
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const cleanerPrice = parseInt(price, 10) ? Math.floor(parseInt(price, 10) * 0.9) : 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>청소로 지불할 요금을 설정해주세요</Text>
        <Text style={styles.subtitle}>언제든지 변경하실 수 있습니다</Text>

        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>￦</Text>
          <TextInput
            ref={inputRef}
            style={styles.priceInput}
            value={price}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
            placeholder="50,000"
          />
        </View>

        <Text style={styles.cleanerPriceText}>
          (클리너 수령 요금: ￦{cleanerPrice.toLocaleString()})
        </Text>

        <Text style={styles.noteText}>
          (*클리너와 호스트는 수수료를 지불함으로써 보장받을 수 있습니다)
        </Text>

        <TouchableOpacity style={styles.infoButton}>
          <Icon name="information-outline" size={24} color={colors[theme].BLUE_500} />
          <Text style={styles.infoButtonText}>요금 설정 도움말</Text>
        </TouchableOpacity>
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors[theme].SKY_MAIN} />
        </View>
      )}
    </View>
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
      fontSize: 24,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors[theme].GRAY_500,
      marginBottom: 30,
    },
    priceInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].GRAY_300,
      paddingBottom: 10,
      marginBottom: 20,
    },
    currencySymbol: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      marginRight: 10,
    },
    priceInput: {
      flex: 1,
      fontSize: 32,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    cleanerPriceText: {
      fontSize: 18,
      color: colors[theme].GRAY_700,
      marginBottom: 20,
    },
    noteText: {
      fontSize: 14,
      color: colors[theme].GRAY_500,
      marginBottom: 30,
    },
    infoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    infoButtonText: {
      marginLeft: 10,
      fontSize: 16,
      color: colors[theme].BLUE_500,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default PricingScreen;
