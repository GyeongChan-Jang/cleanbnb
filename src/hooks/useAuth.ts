import { useState } from 'react';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return {
    isLogin,
  };
};

export default useAuth;
