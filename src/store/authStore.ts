import { UserResponse } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
  user: UserResponse['data']['user'] | null;
  isLoggedIn: boolean;
  setUser: (user: UserResponse['data']['user']) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: UserResponse['data']['user']) => set({ user, isLoggedIn: !!user }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
