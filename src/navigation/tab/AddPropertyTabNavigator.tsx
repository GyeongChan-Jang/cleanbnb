import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { addPropertyNavigations } from '@/constants';
import BasicInfoScreen from '@/screens/property/add/BasicInfoScreen';
import CleaningAreasScreen from '@/screens/property/add/CleaningAreasScreen';
import CleaningToolsScreen from '@/screens/property/add/CleaningToolsScreen';
import GuidelinePhotosScreen from '@/screens/property/add/GuidelinePhotosScreen';
import LocationScreen from '@/screens/property/add/LocationScreen';
import NotesScreen from '@/screens/property/add/NotesScreen';
import PricingScreen from '@/screens/property/add/PricingScreen';
import PropertyTypeScreen from '@/screens/property/add/PropertyTypeScreen';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, TabNavigationState, useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

interface ProgressBarProps {
  progress: number;
}

interface CustomTabBarProps extends BottomTabBarProps {
  state: TabNavigationState<ParamListBase>;
}

export type AddPropertyTabParamList = {
  [addPropertyNavigations.PROPERTY_TYPE]: undefined;
  [addPropertyNavigations.BASIC_INFO]: undefined;
  [addPropertyNavigations.LOCATION]: undefined;
  [addPropertyNavigations.CLEANING_TOOLS]: undefined;
  [addPropertyNavigations.CLEANING_AREAS]: undefined;
  [addPropertyNavigations.GUIDELINE_PHOTOS]: undefined;
  [addPropertyNavigations.SPECIAL_NOTES]: undefined;
  [addPropertyNavigations.PRICING]: undefined;
};

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

const CustomTabBar = ({ state, descriptors, navigation }: CustomTabBarProps) => {
  const progress = ((state.index + 1) / state.routes.length) * 100;

  return (
    <View>
      <ProgressBar progress={progress} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            if (state.index > 0) {
              // 이전 화면으로 이동
              navigation.navigate(state.routes[state.index - 1].name);
            } else {
              // 첫 화면에서 뒤로 가기를 누르면 전체 AddProperty 네비게이터를 벗어남
              navigation.navigate('MainTab');
            }
          }}
          style={styles.tabButton}>
          <Text style={styles.tabButtonText}>뒤로</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (state.index < state.routes.length - 1) {
              navigation.navigate(state.routes[state.index + 1].name);
            } else {
              // 마지막 화면에서의 동작 (예: 등록 완료)
              console.log('Property registration completed');
              navigation.navigate('MainTab');
            }
          }}
          style={styles.tabButton}>
          <Text style={styles.tabButtonText}>
            {state.index === state.routes.length - 1 ? '완료' : '다음'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AddPropertyTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerLeft: () => null, // 뒤로 가기 버튼 제거
      }}>
      <Tab.Screen
        name={addPropertyNavigations.PROPERTY_TYPE}
        component={PropertyTypeScreen}
        options={{ title: '숙소 유형' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.BASIC_INFO}
        component={BasicInfoScreen}
        options={{ title: '기본 정보' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.LOCATION}
        component={LocationScreen}
        options={{ title: '위치' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.CLEANING_TOOLS}
        component={CleaningToolsScreen}
        options={{ title: '청소 도구' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.CLEANING_AREAS}
        component={CleaningAreasScreen}
        options={{ title: '청소 구역' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.GUIDELINE_PHOTOS}
        component={GuidelinePhotosScreen}
        options={{ title: '가이드라인 사진' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.SPECIAL_NOTES}
        component={NotesScreen}
        options={{ title: '특이사항' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.PRICING}
        component={PricingScreen}
        options={{ title: '요금 설정' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default AddPropertyTabNavigator;
