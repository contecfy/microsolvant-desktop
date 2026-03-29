import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  username: string;
  walletBalance: number;
  companies: string[];
}

interface AuthState {
  user: IUser | null;
  token: string | null;
  activeCompanyId: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser, token: string) => void;
  setActiveCompany: (id: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set): AuthState => ({
      user: null,
      token: null,
      activeCompanyId: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        const activeId = user?.companies?.length > 0 ? user.companies[0] : null;
        set({ 
          user, 
          token, 
          activeCompanyId: activeId, 
          isAuthenticated: true 
        });
      },

      setActiveCompany: (id) => {
        set({ activeCompanyId: id });
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          activeCompanyId: null, 
          isAuthenticated: false 
        });
      },
    }),
    {
      name: 'microsolvant-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
