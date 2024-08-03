import { useState, useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { supabase } from "@/lib/supabase"
import useAuthStore from '@/store/authStore';
import { authNavigations } from '@/constants/navigations';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import { Tables } from "database.types";

type Navigation = StackNavigationProp<AuthStackParamList>

const useUser = () => {
  const [user, setUser] = useState<Tables<'users'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<Navigation>();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      Toast.show({
        type: 'error',
        text1: '로그인이 필요합니다',
        text2: '로그인 페이지로 이동합니다',
        position: 'bottom',
      });
      navigation.navigate(authNavigations.AUTH_HOME);
    } else {
      getUser();
    }
  }, [authUser]);

  const getUser = async () => {
    try {
      if(!authUser) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser?.id)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      Toast.show({
        type: 'error',
        text1: '사용자 정보를 가져오는데 실패했습니다',
        text2: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  const refetchUser = () => {
    if (authUser) {
      getUser();
    }
  };

  return { user, loading, error, refetchUser };
};

export default useUser;