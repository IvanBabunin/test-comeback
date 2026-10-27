import { create } from 'zustand';

import { tokenStorage } from '@/helpers/storage';
import type { User } from '@/types/models/user';

type Status = 'restoring' | 'signedIn' | 'signedOut';

type AuthState = {
  status: Status;
  user: User | null;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User) => void;
};

// Токен живе в secure-store, у сторі — лише стан сесії.
export const useAuthStore = create<AuthState>()((set) => ({
  status: 'restoring',
  user: null,
  signIn: async (token, user) => {
    await tokenStorage.set(token);
    set({ status: 'signedIn', user });
  },
  signOut: async () => {
    await tokenStorage.clear();
    set({ status: 'signedOut', user: null });
  },
  setUser: (user) => set({ user }),
}));
