import { colors } from '@/constants';
import { authNavigations } from '@/constants/navigations';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
// import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

// navigation
type KakaoLoginScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.KAKAO
>;

function KakaoLoginScreen({ navigation, route }: KakaoLoginScreenProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  // const { kakaoMutation } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsNavigateChange] = useState(true);

  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log(event);
  };
  const handleNavigationChangeStore = (event: WebViewNavigation) => {
    setIsLoading(event.loading);
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size="small" color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: route.params.url,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={
          "window.ReactNativeWebView.postMessage('카카오 로그인 중 에러가 발생했습니다.')"
        }
        onNavigationStateChange={handleNavigationChangeStore}
      />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    kakaoLoadingContainer: {
      backgroundColor: colors[theme].WHITE,
      height: Dimensions.get('window').height,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 100,
    },
  });

export default KakaoLoginScreen;
