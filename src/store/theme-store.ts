import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ThemeType = 'dark' | 'light';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark', // Default to dark as per our design
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
    }),
    {
      name: 'microsolvant-theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
