import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeMode } from '@/types/common';
import useThemeStore from '@/store/useThemeStore';
import { colors, rootNavigations } from '@/constants';
import PropertyCard from '@/components/property/PropertyCard';
import FloatingButton from '@/components/common/FloatingButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropertyStackParamList } from '@/navigation/stack/PropertyNavigator';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/root/RootNavigator';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList>,
  StackNavigationProp<PropertyStackParamList>
>;

const MyPropertyScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<Navigation>();

  const onAddPropertyPress = () => {
    navigation.navigate(rootNavigations.ADD_PROPERTY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollViewContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16} // 이 값을 추가하여 스크롤 이벤트의 빈도를 조절합니다.
      >
        {/* 헤더 */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>숙소</Text>
        </View>
        <PropertyCard
          image={
            'https://www.travelandleisure.com/thmb/U_ek9iFrp3UwNSOf5xW7MsTEV88=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-zion-ecocabin-WISHLISTBNB0222-f2649df02ff748c5bcff43052f20e309.jpg'
          }
          location="서울"
          title="서울의 아름다운 숙소"
        />
        <PropertyCard
          image={
            'https://a0.muscache.com/im/pictures/5e67688b-757d-44d6-8b4b-1e91dc6fe49f.jpg?im_w=1920'
          }
          location="인천"
          title="인천의 아름다운 숙소"
        />
        <PropertyCard
          image={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbHVCudRciZ9_52VyDV__VZzooE0VIyTOIA&s'
          }
          location="강릉"
          title="강릉의 아름다운 숙소"
        />
        <PropertyCard
          image={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPx3eqBCKt1sKtQECM0-ebQoikcKtFhHNQjA&s'
          }
          location="파주"
          title="파주의 아름다운 숙소"
        />
        <PropertyCard
          image={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjaWBzb-WRlAIAii3_lcE5zhCicIN0e0ovJQ&s'
          }
          location="전주"
          title="전주의 아름다운 숙소"
        />
      </Animated.ScrollView>
      <FloatingButton onPress={onAddPropertyPress} scrollY={scrollY} text="숙소등록" />
    </SafeAreaView>
  );
};

export default MyPropertyScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    scrollViewContent: {
      padding: 20,
      flexGrow: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 30,
    },
    headerText: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
