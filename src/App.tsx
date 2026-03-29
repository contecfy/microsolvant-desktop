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
      {/* Background Visual */}
      <div className="gateway-bg">
        <img 
          src="https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg" 
          alt="Gateway Background" 
        />
      </div>

      {/* Native-like Title Bar (Draggable) */}
      <div className="title-bar drag-handle">
        <div className="app-title">
          <Shield size={16} className="app-icon" />
          <span>Institutional Gateway</span>
        </div>
      </div>

      <main className="main-content">
        <div className="hero-glass">
          <div className="brand-logo">
            <LayoutDashboard size={40} color="#000" />
          </div>
          
          <h1 className="hero-title">Microsolvant</h1>
          <p className="hero-subtitle">
            Experience the next generation of institutional-grade micro-finance management. 
            Secure, professional, and built for scale.
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
              variant="ghost" 
              size="lg" 
              className="hero-btn"
              style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={() => setView('login')}
            >
              Sign In
            </NativeButton>
          </div>
        </div>

        <div className="footer-status">
          <div className="status-item">
            <div className="status-dot online"></div>
            <span>System Operational</span>
          </div>
          <div className="status-divider"></div>
          <div className="status-item">
            <Globe size={14} />
            <span>Region: GLOBAL ACCESS</span>
          </div>
          <div className="status-divider"></div>
          <div className="v-tag">VER 1.0.0-PRO</div>
        </div>
      </main>
    </div>
  );
};

export default App;
