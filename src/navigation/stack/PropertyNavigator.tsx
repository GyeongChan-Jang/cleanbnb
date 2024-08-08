import { propertyNavigations } from '@/constants/navigations';
import MyPropertyScreen from '@/screens/property/MyPropertyScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type PropertyStackParamList = {
  [propertyNavigations.MY_PROPERTY]: undefined;
};
const Stack = createStackNavigator<PropertyStackParamList>();

const PropertyStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={propertyNavigations.MY_PROPERTY} component={MyPropertyScreen} />
    </Stack.Navigator>
  );
};

export default PropertyStackNavigator;
