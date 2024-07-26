import { createStackNavigator } from '@react-navigation/stack';
import { chatNavigations, homeNavigations } from '@/constants/navigations';
import ChatScreen from '@/screens/home/ChatScreen';

export type ChatStackParamList = {
  [chatNavigations.CHAT_MAIN]: undefined;
};

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={chatNavigations.CHAT_MAIN} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
