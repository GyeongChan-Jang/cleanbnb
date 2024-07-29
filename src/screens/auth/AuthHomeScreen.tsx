import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import { authNavigations } from '@/constants/navigations';
// import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
// import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
// import useAuth from '@/hooks/queries/useAuth';
// import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import CustomButton from '@/components/common/CustomButton';
import { supabase } from '@/lib/supabase';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({ navigation }: AuthHomeScreenProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  // const { appleMutation } = useAuth();
  // const handlePressAppleLogin = async () => {
  //   // 애플 개발자 등록 보류
  //   try {
  //     const { identityToken, fullName } = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });
  //     if (identityToken) {
  //       appleMutation.mutate({
  //         identityToken,
  //         appId: 'org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)', // app bundle name
  //         nickname: fullName?.givenName ?? null,
  //       });
  //     }
  //   } catch (error) {
  //     if (error.code !== appleAuth.Error.CANCELED) {
  //       Toast.show({
  //         type: 'error',
  //         text1: '애플 로그인이 실패했습니다.',
  //         text2: '나중에 다시 시도해주세요.',
  //       });
  //     }
  //   }
  // };

  const handleKakaoLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
      });

      if (error) throw error;

      navigation.navigate(authNavigations.KAKAO, {
        url: data.url,
      });
      console.log(data);

      // 로그인 성공 처리

      // 여기에 로그인 성공 후 처리 로직 추가 (예: 홈 화면으로 네비게이션)
    } catch (error) {
      console.error('Kakao login failed:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: '카카오 로그인 실패',
      //   text2: '나중에 다시 시도해주세요.',
      // });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/justsoldit.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
        )} */}
        <CustomButton
          // onPress={() => navigation.navigate(authNavigations.KAKAO)}
          onPress={handleKakaoLogin}
          variant="filled"
          label="카카오 로그인하기"
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={<Ionicons name="chatbubble-sharp" size={16} color="#181500" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1.5,
      width: Dimensions.get('screen').width / 2,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      gap: 10,
      alignItems: 'center',
    },
    kakaoButtonContainer: {
      backgroundColor: '#FEE503',
    },
    kakaoButtonText: {
      color: '#181600',
    },
    emailText: {
      textDecorationLine: 'underline',
      fontWeight: '500',
      padding: 10,
      color: colors[theme].BLACK,
    },
    appleButton: {
      width: Dimensions.get('window').width - 60,
      height: 45,
      paddingVertical: 25,
    },
  });

export default AuthHomeScreen;
