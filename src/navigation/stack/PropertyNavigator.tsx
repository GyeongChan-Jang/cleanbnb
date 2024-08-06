import { propertyNavigations } from '@/constants/navigations';
import AddPropertyScreen from '@/screens/property/add/AddPropertyScreen';
import BasicInfoScreen from '@/screens/property/add/BasicInfoScreen';
import CleaningAreasScreen from '@/screens/property/add/CleaningAreasScreen';
import CleaningToolsScreen from '@/screens/property/add/CleaningToolsScreen';
import GuidelinePhotosScreen from '@/screens/property/add/GuidelinePhotosScreen';
import LocationScreen from '@/screens/property/add/LocationScreen';
import NotesScreen from '@/screens/property/add/NotesScreen';
import PricingScreen from '@/screens/property/add/PricingScreen';
import PropertyTypeScreen from '@/screens/property/add/PropertyTypeScreen';
import MyPropertyScreen from '@/screens/property/MyPropertyScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type PropertyStackParamList = {
  [propertyNavigations.MY_PROPERTY]: undefined;
  [propertyNavigations.ADD_PROPERTY]: undefined;
  [propertyNavigations.PROPERTY_TYPE]: undefined;
  [propertyNavigations.BASIC_INFO]: undefined;
  [propertyNavigations.LOCATION]: undefined;
  [propertyNavigations.CLEANING_TOOLS]: undefined;
  [propertyNavigations.CLEANING_AREAS]: undefined;
  [propertyNavigations.GUIDELINE_PHOTOS]: undefined;
  [propertyNavigations.SPECIAL_NOTES]: undefined;
  [propertyNavigations.PRICING]: undefined;
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

      <Stack.Screen name={propertyNavigations.PROPERTY_TYPE} component={PropertyTypeScreen} />
      <Stack.Screen name={propertyNavigations.BASIC_INFO} component={BasicInfoScreen} />
      <Stack.Screen name={propertyNavigations.LOCATION} component={LocationScreen} />
      <Stack.Screen name={propertyNavigations.CLEANING_TOOLS} component={CleaningToolsScreen} />
      <Stack.Screen name={propertyNavigations.CLEANING_AREAS} component={CleaningAreasScreen} />
      <Stack.Screen name={propertyNavigations.GUIDELINE_PHOTOS} component={GuidelinePhotosScreen} />
      <Stack.Screen name={propertyNavigations.SPECIAL_NOTES} component={NotesScreen} />
      <Stack.Screen name={propertyNavigations.PRICING} component={PricingScreen} />
    </Stack.Navigator>
  );
};

export default PropertyStackNavigator;
