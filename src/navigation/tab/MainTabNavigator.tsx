import useThemeStorage from '@/hooks/useThemeStorage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator, { HomeStackParamList } from '../stack/HomeStackNavigator';
import { mainNavigations } from '@/constants/navigations';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import ChatStackNavigator, { ChatStackParamList } from '../stack/ChatStackNavigator';
import JobStackNavigator, { JobStackParamList } from '../stack/JobStackNavigator';
import ProfileStackNavigator, { ProfileStackParamList } from '../stack/ProfileNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      iconName = 'home-sharp';
      break;
    case mainNavigations.JOB:
      iconName = 'briefcase';
      break;
    case mainNavigations.CHAT:
      iconName = 'chatbubbles';
      break;
    case mainNavigations.PROFILE:
      iconName = 'person-circle';
      break;
    default:
      break;
  }

  return (
    <Ionicons
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
