import { colors } from '@/constants';
import { authNavigations, homeNavigations, mainNavigations } from '@/constants/navigations';
import { supabase } from '@/lib/supabase';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { User as AuthUser } from '@supabase/supabase-js';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigation/tab/MainTabNavigator';

type KakaoLoginScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.KAKAO>;

const REDIRECT_URI = `${Platform.OS === 'ios' ? 'http://localhost:3030/' : 'http://10.0.2.2:3030/'}auth/oauth/kakao`;

// type Navigation = CompositeNavigationProp<StackNavigationProp<AuthStackParamList>, BottomTabNavigationProp<MainTabParamList>>;

function KakaoLoginScreen({}: KakaoLoginScreenProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsNavigateChange] = useState(true);
  const { setIsRegistered } = useAuthStore();

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

    const { id_token } = res.data;

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'kakao',
      token: id_token,
    });

    // 가입된 유저인지 체크
    const { data: user } = await supabase.from('users').select('*').eq('id', data?.user?.id).single();
    console.log('user', user);
    if (user) {
      setIsRegistered(true);
    } else {
      navigation.navigate(authNavigations.USER_SETUP);
    }

    if (error) {
      console.error('Kakao login failed:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: '카카오 로그인 실패',
      //   text2: '나중에 다시 시도해주세요.',
      // });
    }
  };

  const handleNavigationStateChange = async (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsNavigateChange(event.loading);
    if (event.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size="small" color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationStateChange}
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
