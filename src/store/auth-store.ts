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
    (set) => ({
      user: null as IUser | null,
      token: null as string | null,
      activeCompanyId: null as string | null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        const activeId = user.companies?.length > 0 ? user.companies[0] : null;
        
        // Also set manual keys for the API interceptor compatibility
        localStorage.setItem('auth_token', token);
        if (activeId) localStorage.setItem('active_company_id', activeId);

        set({ 
          user, 
          token, 
          activeCompanyId: activeId, 
          isAuthenticated: true 
        });
      },

      setActiveCompany: (id) => {
        localStorage.setItem('active_company_id', id);
        set({ activeCompanyId: id });
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('active_company_id');
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
