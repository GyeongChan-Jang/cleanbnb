import React from 'react';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';
import useAuthStore from '@/store/authStore';

const RootNavigator = () => {
  const { isLoggedIn, user } = useAuthStore();

  return (
    <RetryErrorBoundary>
      {isLoggedIn ? <MainTabNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
};

export default RootNavigator;
