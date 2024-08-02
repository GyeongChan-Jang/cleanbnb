import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';
import { AuthUser, UserResponse } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isRegistered: boolean;
  setUser: (user: AuthUser) => void;
  setIsRegistered: (isRegistered: boolean) => void;
  // logout: () => void;
  // checkRegistration: (userId: string) => Promise<boolean>;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoggedIn: false,
  isRegistered: false,
  setUser: (user: AuthUser) => set({ user, isLoggedIn: !!user }),
  setIsRegistered: (isRegistered: boolean) => set({ isRegistered }),
  // logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
