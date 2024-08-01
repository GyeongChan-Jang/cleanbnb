import { authNavigations } from '@/constants/navigations';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import useThemeStorage from '@/hooks/useThemeStorage';
import { colors } from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import UserSetupScreen from '@/screens/auth/UserSetupScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.KAKAO]: undefined;
  [authNavigations.APPLE]: undefined;
  [authNavigations.USER_SETUP]: undefined;
};
interface AuthStackNavigatorProps {
  initialRouteName?: keyof AuthStackParamList;
}

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = ({ initialRouteName }: AuthStackNavigatorProps) => {
  const { theme } = useThemeStorage();
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={KakaoLoginScreen}
        options={{
          headerTitle: '카카오 로그인',
        }}
      />
      <Stack.Screen
        name="UserSetup"
        component={UserSetupScreen}
        options={{
          headerTitle: '프로필 설정',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
