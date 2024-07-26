import { createStackNavigator } from '@react-navigation/stack';
import { homeNavigations } from '@/constants/navigations';
import HomeScreen from '@/screens/home/HomeScreen';

export type HomeStackParamList = {
  [homeNavigations.HOME_MAIN]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={homeNavigations.HOME_MAIN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
