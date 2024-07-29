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

const REDIRECT_URI = `${
  Platform.OS === 'ios' ? 'http://localhost:3030/' : 'http://10.0.2.2:3030/'
}auth/oauth/kakao`;

function KakaoLoginScreen({ navigation, route }: KakaoLoginScreenProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  // const { kakaoMutation } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsNavigateChange] = useState(true);

  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log(event);
    // if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
    //   const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
    //   requestToken(code);
    // }
  };

  // const requestToken = async (code: string) => {
  //   const response = await axios({
  //     method: 'post',
  //     url: 'https://kauth.kakao.com/oauth/token',
  //     params: {
  //       grant_type: 'authorization_code',
  //       client_id: Config.KAKAO_REST_API_KEY,
  //       redirect_uri: REDIRECT_URI,
  //       code,
  //     },
  //   });
  //   kakaoMutation.mutate(response.data.access_token);
  // };

  const handleNavigationChangeStore = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsNavigateChange(event.loading);
  };
  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size="small" color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        // source={{
        //   uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        // }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
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
