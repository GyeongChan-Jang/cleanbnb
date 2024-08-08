import React from 'react';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';
import useAuthStore from '@/store/authStore';
import { createStackNavigator } from '@react-navigation/stack';
import { rootNavigations } from '@/constants';
import AddPropertyTabNavigator from '../tab/AddPropertyTabNavigator';

export type RootStackParamList = {
  [rootNavigations.MAIN_TAB]: undefined;
  [rootNavigations.ADD_PROPERTY]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const AuthenticatedNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={rootNavigations.MAIN_TAB} component={MainTabNavigator} />
      <RootStack.Screen name={rootNavigations.ADD_PROPERTY} component={AddPropertyTabNavigator} />
    </RootStack.Navigator>
  );
};

const RootNavigator = () => {
  const { isLoggedIn, isRegistered } = useAuthStore();

  return (
    <RetryErrorBoundary>
      {isLoggedIn && isRegistered ? <AuthenticatedNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
};

export default RootNavigator;
