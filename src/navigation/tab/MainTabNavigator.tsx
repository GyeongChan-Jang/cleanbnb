import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useThemeStorage from '@/hooks/useThemeStorage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator, { HomeStackParamList } from '../stack/HomeStackNavigator';
import { mainNavigations } from '@/constants/navigations';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import ChatStackNavigator, { ChatStackParamList } from '../stack/ChatStackNavigator';
import JobStackNavigator, { JobStackParamList } from '../stack/JobStackNavigator';
import ProfileStackNavigator, { ProfileStackParamList } from '../stack/ProfileNavigator';
import { colors } from '@/constants';

export type MainTabParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [mainNavigations.CHAT]: NavigatorScreenParams<ChatStackParamList>;
  [mainNavigations.JOB]: NavigatorScreenParams<JobStackParamList>;
  [mainNavigations.PROFILE]: NavigatorScreenParams<ProfileStackParamList>;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcons = (route: RouteProp<MainTabParamList>, focused: boolean) => {
  const { theme } = useThemeStorage();
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME:
      iconName = 'home';
      break;
    case mainNavigations.JOB:
      iconName = 'work';
      break;
    case mainNavigations.CHAT:
      iconName = 'chat';
      break;
    case mainNavigations.PROFILE:
      iconName = 'person';
      break;
    default:
      break;
  }

  return (
    <MaterialIcons
      name={iconName}
      size={24}
      color={focused ? colors[theme].BLACK : colors[theme].GRAY_500}
    />
  );
};

const MainTabNavigator = () => {
  const { theme } = useThemeStorage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => TabIcons(route, focused),
        tabBarActiveTintColor: colors[theme].BLACK,
        tabBarInactiveTintColor: colors[theme].GRAY_500,
        headerShown: false,
      })}>
      <Tab.Screen
        name={mainNavigations.HOME}
        component={HomeStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Tab.Screen
        name={mainNavigations.JOB}
        component={JobStackNavigator}
        options={{
          title: '공고',
        }}
      />
      <Tab.Screen
        name={mainNavigations.CHAT}
        component={ChatStackNavigator}
        options={{
          title: '채팅',
        }}
      />
      <Tab.Screen
        name={mainNavigations.PROFILE}
        component={ProfileStackNavigator}
        options={{
          title: '프로필',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
