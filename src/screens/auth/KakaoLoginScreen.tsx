import { colors } from '@/constants';
import { authNavigations } from '@/constants/navigations';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';

type KakaoLoginScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.KAKAO>;

const REDIRECT_URI = 'http://localhost:3030/auth/oauth/kakao';

function KakaoLoginScreen({ route }: KakaoLoginScreenProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useAuth();
  const webviewRef = React.useRef<WebView>(null);

  const setUser = useAuthStore(state => state.setUser);

  const extractAccessToken = (url: string) => {
    const hashIndex = url.indexOf('#access_token=');
    if (hashIndex !== -1) {
      const tokenStart = hashIndex + '#access_token='.length;
      const tokenEnd = url.indexOf('&', tokenStart);
      if (tokenEnd !== -1) {
        return url.substring(tokenStart, tokenEnd);
      } else {
        return url.substring(tokenStart);
      }
    }
    return null;
  };

  // const handleNavigationStateChange = async (event: WebViewNavigation) => {
  //   console.log('event url', event.url);

  //   // localhost:3000으로 리다이렉트되고 access_token이 포함된 경우에만 처리
  //   if (event.url.startsWith('http://localhost:3000/') && event.url.includes('#access_token=')) {
  //     const accessToken = extractAccessToken(event.url);

  //     if (accessToken) {
  //       try {
  //         // access token으로 세션 설정
  //         const { data, error } = await supabase.auth.setSession({
  //           access_token: accessToken,
  //           refresh_token: extractRefreshToken(event.url)!,
  //         });

  //         if (error) throw error;

  //         if (data.user) {
  //           console.log('User data:', data.user);
  //           setIsLogin(true);
  //           setUser(data.user);
  //         }
  //       } catch (error) {
  //         console.error('Error setting session:', error);
  //         // 에러 처리 로직 추가
  //       }
  //     }
  //   }
  //   setIsLoading(event.loading);
  // };

  // refresh_token 추출 함수 추가
  const extractRefreshToken = (url: string) => {
    const refreshTokenMatch = url.match(/refresh_token=([^&]+)/);
    return refreshTokenMatch ? refreshTokenMatch[1] : null;
  };

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const res = await axios('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
        client_secret: Config.KAKAO_CLIENT_SECRET,
      },
    });

    // console.log(res);
  };

  // const handleNavigationStateChange = async (event: WebViewNavigation) => {
  //   console.log('event url', event.url);
  //   if (event.url.includes('#access_token=')) {
  //     const accessToken = extractAccessToken(event.url);

  //     if (accessToken) {
  //       try {
  //         const {
  //           data: { user },
  //           error,
  //         } = await supabase.auth.getUser(accessToken);
  //         if (error) throw error;

  //         if (user) {
  //           console.log('User data:', user);
  //           setIsLogin(true);
  //           setUser(user);
  //           // 여기에 로그인 성공 후 처리 로직 추가 (예: 홈 화면으로 네비게이션)
  //         }
  //       } catch (error) {
  //         console.error('Error getting user:', error);
  //         // 에러 처리 로직 추가
  //       }
  //     }
  //   }
  //   setIsLoading(event.loading);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size="small" color={colors[theme].BLACK} />
        </View>
      )} */}
      <WebView
        // source={{
        //   uri: route.params.url,
        // }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        // onNavigationStateChange={handleNavigationStateChange}
        // originWhitelist={['intent']}
        onMessage={handleOnMessage}
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
{
  /* <WebView
        source={{
          uri: route.params.url,
        }}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationStateChange}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
        originWhitelist={['*']} // 모든 origin 허용 (개발 중에만 사용)
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['intent']}
      /> */
}
