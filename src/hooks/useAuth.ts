import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLogin(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLogin(false);
      }
    });

    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogin(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  console.log('isLogin', isLogin);
  return {
    isLogin,
  };
};

export default useAuth;
