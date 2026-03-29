import { create } from 'zustand';

type ViewType = 'intro' | 'login' | 'register' | 'dashboard' | 'settings' | 'analytics' | 'reports' | 'loans' | 'clients' | 'staff';

interface UIState {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentView: 'intro',
  setView: (view) => set({ currentView: view }),
}));
