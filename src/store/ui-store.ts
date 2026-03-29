import { create } from 'zustand';

type ViewType = 'intro' | 'login' | 'register' | 'dashboard';

interface UIState {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentView: 'intro',
  setView: (view) => set({ currentView: view }),
}));
