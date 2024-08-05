import React from 'react';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';
import useAuthStore from '@/store/authStore';

const RootNavigator = () => {
  const { isLoggedIn, isRegistered } = useAuthStore();

  return (
    <RetryErrorBoundary>
      {isLoggedIn && isRegistered ? <MainTabNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
};

export default RootNavigator;
