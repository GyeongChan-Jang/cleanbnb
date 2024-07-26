import { createStackNavigator } from '@react-navigation/stack';
import {
  chatNavigations,
  homeNavigations,
  profileNavigations,
} from '@/constants/navigations';
import ChatScreen from '@/screens/home/ChatScreen';
import ProfileScreen from '@/screens/home/ProfileScreen';

export type ProfileStackParamList = {
  [profileNavigations.PROFILE_MAIN]: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={profileNavigations.PROFILE_MAIN} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
