import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';
import { UserResponse } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: User) => set({ user, isLoggedIn: !!user }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
