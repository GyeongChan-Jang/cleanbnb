import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { addPropertyNavigations, colors } from '@/constants';
import BasicInfoScreen from '@/screens/property/add/BasicInfoScreen';
import CleaningAreasScreen from '@/screens/property/add/CleaningAreasScreen';
import CleaningToolsScreen from '@/screens/property/add/CleaningToolsScreen';
import GuidelinePhotosScreen from '@/screens/property/add/GuidelinePhotosScreen';
import LocationScreen from '@/screens/property/add/LocationScreen';
import NotesScreen from '@/screens/property/add/NotesScreen';
import PricingScreen from '@/screens/property/add/PricingScreen';
import PropertyTypeScreen from '@/screens/property/add/PropertyTypeScreen';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { ThemeMode } from '@/types/common';
import useThemeStore from '@/store/useThemeStore';
import CustomButton from '@/components/common/CustomButton';
import useAddPropertyStore, { AddPropertyState } from '@/store/useAddPropertyStore';
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import CompleteScreen from '@/screens/property/add/CompleteScreen';

const Tab = createBottomTabNavigator();

interface ProgressBarProps {
  progress: number;
}

interface CustomTabBarProps extends BottomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  // descriptors: BottomTabDescriptorMap & {
  //   [key: string]: {
  //     options: CustomStackNavigationOptions;
  //   };
  // };
}

export interface CustomStackNavigationOptions extends BottomTabNavigationOptions {
  onNextPress?: () => Promise<void>;
}

export type AddPropertyTabParamList = {
  [addPropertyNavigations.PROPERTY_TYPE]: undefined;
  [addPropertyNavigations.BASIC_INFO]: undefined;
  [addPropertyNavigations.LOCATION]: undefined;
  [addPropertyNavigations.CLEANING_TOOLS]: undefined;
  [addPropertyNavigations.CLEANING_AREAS]: undefined;
  [addPropertyNavigations.GUIDELINE_PHOTOS]: {
    onNextPress?: () => Promise<void>;
  };
  [addPropertyNavigations.NOTES]: undefined;
  [addPropertyNavigations.PRICING]: undefined;
  [addPropertyNavigations.COMPLETE]: undefined;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: CustomTabBarProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const progress = ((state.index + 1) / state.routes.length) * 100;
  const isStepValid = useAddPropertyStore(state => state.isStepValid);
  const currentRouteName = state.routes[state.index].name as keyof AddPropertyState;
  const currentRoute = state.routes[state.index];

  const { onNextPress } = descriptors[currentRoute.key].options as {
    onNextPress?: () => Promise<void>;
  };

  const relevantState = useAddPropertyStore(state => ({
    propertyType: state.propertyType,
    basicInfo: state.basicInfo,
    location: state.location,
    cleaningTools: state.cleaningTools,
    cleaningAreas: state.cleaningAreas,
    guidelinePhotos: state.guidelinePhotos,
    specialNotes: state.notes,
    pricing: state.pricing,
  }));

  const isNextDisabled = useMemo(() => {
    return !isStepValid(currentRouteName);
  }, [isStepValid, currentRouteName, relevantState]);

  // CompleteScreen에서는 탭바를 숨깁니다.
  if (state.routes[state.index].name === addPropertyNavigations.COMPLETE) {
    return null;
  }

  return (
    <View style={styles.bottomTabContainer}>
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
        <CustomButton
          onPress={async () => {
            if (onNextPress) await onNextPress();
            else if (state.index < state.routes.length - 1) {
              navigation.navigate(state.routes[state.index + 1].name);
            } else {
              console.log('Property registration completed');
              navigation.navigate('MainTab');
            }
          }}
          label="다음"
          style={styles.tabButton}
          disabled={isNextDisabled}>
          <Text style={styles.tabButtonText}>
            {state.index === state.routes.length - 1 ? '완료' : '다음'}
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};
// CustomStackNavigationOptions;
const AddPropertyTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }): CustomStackNavigationOptions => ({
        headerShown: route.name !== addPropertyNavigations.COMPLETE,
        headerLeft: () => null, // 뒤로 가기 버튼 제거
        headerTitle: '', // 타이틀 제거
        onNextPress: undefined,
      })}>
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
        name={addPropertyNavigations.NOTES}
        component={NotesScreen}
        options={{ title: '특이사항' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.PRICING}
        component={PricingScreen}
        options={{ title: '요금 설정' }}
      />
      <Tab.Screen
        name={addPropertyNavigations.COMPLETE}
        component={CompleteScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // 이 줄을 추가합니다.
        }}
      />
    </Tab.Navigator>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    bottomTabContainer: {
      height: Dimensions.get('window').height * 0.15,
    },
    progressBarContainer: {
      width: '100%',
      height: 5,
      backgroundColor: colors[theme].GRAY_100,
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors[theme].SKY_MAIN,
    },
    tabContainer: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors[theme].WHITE,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      height: '100%',
    },
    tabButton: {
      borderRadius: 10,
      width: 70,
      aspectRatio: 1.5,
      padding: 15,
      alignItems: 'center',
    },
    tabButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
  });

export default AddPropertyTabNavigator;
