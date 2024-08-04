import { propertyNavigations } from '@/constants/navigations';
import AddPropertyScreen from '@/screens/property/AddPropertyScreen';
import MyPropertyScreen from '@/screens/property/MyPropertyScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type PropertyStackParamList = {
  [propertyNavigations.MY_PROPERTY]: undefined;
  [propertyNavigations.ADD_PROPERTY]: undefined;
};
const Stack = createStackNavigator<PropertyStackParamList>();

const PropertyStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={propertyNavigations.MY_PROPERTY} component={MyPropertyScreen} />

      <Stack.Screen name={propertyNavigations.ADD_PROPERTY} component={AddPropertyScreen} />
    </Stack.Navigator>
  );
};

export default PropertyStackNavigator;
