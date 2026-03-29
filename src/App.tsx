import React from 'react';
import { Shield, ArrowRight, LayoutDashboard, Globe } from 'lucide-react';
import NativeButton from './components/NativeButton';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import DashboardView from './components/DashboardView';
import SettingsView from './components/SettingsView';
import { useUIStore } from './store/ui-store';
import { useThemeStore } from './store/theme-store';
import './App.css';

const App: React.FC = () => {
  const currentView = useUIStore((state) => state.currentView);
  const setView = useUIStore((state) => state.setView);
  const theme = useThemeStore((state) => state.theme);

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  if (currentView === 'login') return <LoginView />;
  if (currentView === 'dashboard') return <DashboardView />;
  if (currentView === 'register') return <RegisterView />;
  if (currentView === 'settings') return <SettingsView />;
  if (currentView === 'analytics') return <DashboardView />;
  if (currentView === 'reports') return <DashboardView />;
  if (currentView === 'loans') return <DashboardView />;
  if (currentView === 'clients') return <DashboardView />;
  if (currentView === 'staff') return <DashboardView />;

  return (
    <div className="app-shell">
      {/* Native-like Title Bar (Draggable) */}
      <div className="title-bar drag-handle">
        <div className="app-title">
          <Shield size={14} className="app-icon" />
          <span>Microsolvant</span>
        </div>
      </div>

      <main className="main-content">
        <div className="hero-section">
          <div className="brand-logo">
            <div className="logo-inner">
              <LayoutDashboard size={48} color="var(--accent-primary)" />
            </div>
          </div>
          
          <h1 className="hero-title">Welcome to Microsolvant</h1>
          <p className="hero-subtitle">
            The intelligent platform for microfinance management and local lending. 
            Secure, fast, and cross-platform.
          </p>

          <div className="action-group">
            <NativeButton 
              variant="primary" 
              size="lg" 
              className="hero-btn"
              onClick={() => setView('login')}
            >
              Get Started <ArrowRight size={18} />
            </NativeButton>
            <NativeButton 
              variant="secondary" 
              size="lg" 
              className="hero-btn"
              onClick={() => setView('login')}
            >
              Sign In
            </NativeButton>
          </div>
        </div>

        <div className="footer-status">
          <div className="status-item">
            <div className="status-dot online"></div>
            <span>System Online</span>
          </div>
          <div className="status-divider"></div>
          <div className="status-item">
            <Globe size={14} />
            <span>Region: East Africa</span>
          </div>
          <div className="v-tag">v1.0.0</div>
        </div>
      </main>
    </div>
  );
};

export default App;
