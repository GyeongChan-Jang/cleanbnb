import React from 'react';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';
import useAuth from '@/hooks/useAuth';

const RootNavigator = () => {
  const { isLogin } = useAuth();
  return (
    <RetryErrorBoundary>
      {!isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
};

export default RootNavigator;
