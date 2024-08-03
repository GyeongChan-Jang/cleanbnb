import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';
import { AuthUser, UserResponse } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
  authUser: AuthUser | null; // supabase에서 제공하는 auth user
  setAuthUser: (user: AuthUser) => void;
  isLoggedIn: boolean;
  isRegistered: boolean;
  setIsRegistered: (isRegistered: boolean) => void;
  // user: any
  // setUser: (user: UserResponse) => void;
  // logout: () => void;
  // checkRegistration: (userId: string) => Promise<boolean>;
}

const useAuthStore = create<AuthStore>(set => ({
  authUser: null,
  isLoggedIn: false,
  isRegistered: false,
  setAuthUser: (authUser: AuthUser) => set({ authUser, isLoggedIn: !!authUser }),
  setIsRegistered: (isRegistered: boolean) => set({ isRegistered }),
  // logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
