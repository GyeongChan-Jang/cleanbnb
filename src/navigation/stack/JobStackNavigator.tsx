import { createStackNavigator } from '@react-navigation/stack';
import { jobNavigations } from '@/constants/navigations';
import JobScreen from '@/screens/home/JobScreen';

export type JobStackParamList = {
  [jobNavigations.JOB_MAIN]: undefined;
};

const Stack = createStackNavigator<JobStackParamList>();

const JobStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={jobNavigations.JOB_MAIN} component={JobScreen} />
    </Stack.Navigator>
  );
};

export default JobStackNavigator;
