import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AddPropertyTabParamList } from '@/navigation/tab/AddPropertyTabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import completeAnimation from '@/assets/animations/complete.json';
import LottieView from 'lottie-react-native';

const CompleteScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<AddPropertyTabParamList>>();

  const handleGoToListing = () => {
    // 등록된 숙소 목록 페이지로 이동
    // navigation.navigate('PropertyList');
  };

  const handleAddAnotherProperty = () => {
    // 새로운 숙소 등록 프로세스 시작
    // navigation.navigate('PropertyType');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LottieView source={completeAnimation} autoPlay loop style={styles.illustration} />
      <Text style={styles.title}>축하합니다!</Text>
      <Text style={styles.subtitle}>숙소 등록이 완료되었습니다.</Text>

      <View>
        <View style={styles.infoContainer}>
          <Icon name="check-circle" size={24} color={colors[theme].GREEN} style={styles.icon} />
          <Text style={styles.infoText}>숙소 정보가 저장되었습니다.</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="check-circle" size={24} color={colors[theme].GREEN} style={styles.icon} />
          <Text style={styles.infoText}>클리너들이 곧 숙소를 확인할 수 있습니다.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleGoToListing}>
        <Text style={styles.primaryButtonText}>등록된 숙소 보기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleAddAnotherProperty}>
        <Text style={styles.secondaryButtonText}>다른 숙소 등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
      paddingTop: Dimensions.get('window').height * 0.05,
    },
    contentContainer: {
      padding: 20,
      alignItems: 'center',
    },
    illustration: {
      width: 200,
      height: 200,
      marginBottom: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: colors[theme].GRAY_700,
      marginBottom: 30,
      textAlign: 'center',
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    icon: {
      marginRight: 10,
    },
    infoText: {
      fontSize: 16,
      color: colors[theme].GRAY_700,
    },
    primaryButton: {
      backgroundColor: colors[theme].SKY_MAIN,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 30,
      width: '100%',
      alignItems: 'center',
    },
    primaryButtonText: {
      color: colors[theme].WHITE,
      fontSize: 18,
      fontWeight: 'bold',
    },
    secondaryButton: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 15,
      width: '100%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors[theme].SKY_MAIN,
    },
    secondaryButtonText: {
      color: colors[theme].SKY_MAIN,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default CompleteScreen;
