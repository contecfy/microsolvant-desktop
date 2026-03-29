import React from 'react';
import { 
  ChevronLeft, 
  Moon, 
  Sun, 
  User, 
  Bell, 
  Shield, 
  Monitor,
  Check
} from 'lucide-react';
import NativeButton from './NativeButton';
import { useUIStore } from '../store/ui-store';
import { useThemeStore } from '../store/theme-store';
import './SettingsView.css';

const SettingsView: React.FC = () => {
  const setView = useUIStore((state) => state.setView);
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <div className="settings-header">
          <NativeButton variant="ghost" size="sm" onClick={() => setView('dashboard')}>
            <ChevronLeft size={16} /> Back to Dashboard
          </NativeButton>
          <h1>Settings</h1>
        </div>
        
        <nav className="settings-nav">
          <div className="settings-nav-item active">
            <Monitor size={18} /> Appearance
          </div>
          <div className="settings-nav-item">
            <User size={18} /> Account
          </div>
          <div className="settings-nav-item">
            <Bell size={18} /> Notifications
          </div>
          <div className="settings-nav-item">
            <Shield size={18} /> Privacy & Security
          </div>
        </nav>
      </aside>

      <main className="settings-content">
        <section className="settings-section">
          <h2>Appearance</h2>
          <p className="section-desc">Customize how Microsolvant looks on your device.</p>

          <div className="theme-selector">
            <div 
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              <div className="theme-preview light">
                <div className="preview-sidebar"></div>
                <div className="preview-content">
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>
                </div>
              </div>
              <div className="theme-info">
                <div className="theme-label">
                  <Sun size={14} /> Light
                </div>
                {theme === 'light' && <Check size={14} className="check-icon" />}
              </div>
            </div>

            <div 
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <div className="theme-preview dark">
                <div className="preview-sidebar"></div>
                <div className="preview-content">
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>
                </div>
              </div>
              <div className="theme-info">
                <div className="theme-label">
                  <Moon size={14} /> Dark
                </div>
                {theme === 'dark' && <Check size={14} className="check-icon" />}
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>Application Information</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Version</span>
              <span className="info-value">1.0.0 (Production)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Release Channel</span>
              <span className="info-value">Stable</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Checked</span>
              <span className="info-value">Today at 14:20</span>
            </div>
          </div>
          <NativeButton variant="secondary" size="sm" style={{ marginTop: '16px' }}>
            Check for Updates
          </NativeButton>
        </section>
      </main>
    </div>
  );
};

export default SettingsView;
