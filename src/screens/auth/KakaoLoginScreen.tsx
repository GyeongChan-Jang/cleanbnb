import { colors } from '@/constants';
import { authNavigations } from '@/constants/navigations';
import { supabase } from '@/lib/supabase';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

type KakaoLoginScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.KAKAO>;

function KakaoLoginScreen({ route }: KakaoLoginScreenProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigationStateChange = async (event: WebViewNavigation) => {
    const code = event.url.match(/code=([^&]*)/)?.[1];
    if (!code) return;
    const { error } = await supabase.auth.exchangeCodeForSession(code);
  };

  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log('message', event);
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
