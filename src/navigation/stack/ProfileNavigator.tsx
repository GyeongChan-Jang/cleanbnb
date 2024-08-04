import { createStackNavigator } from '@react-navigation/stack';
import {
  chatNavigations,
  homeNavigations,
  profileNavigations,
  propertyNavigations,
} from '@/constants/navigations';
import ChatScreen from '@/screens/home/ChatScreen';
import ProfileScreen from '@/screens/home/ProfileScreen';
import PropertyStackNavigator from './PropertyNavigator';

export type ProfileStackParamList = {
  [profileNavigations.PROFILE_MAIN]: undefined;
  [profileNavigations.PROPERTY]: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={profileNavigations.PROFILE_MAIN} component={ProfileScreen} />

      <Stack.Screen name={profileNavigations.PROPERTY} component={PropertyStackNavigator} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
