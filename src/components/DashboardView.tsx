import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Plus
} from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { useUIStore } from '../store/ui-store';
import NativeButton from './NativeButton';
import './DashboardView.css';

const DashboardView: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const setView = useUIStore((state) => state.setView);

  const handleLogout = () => {
    logout();
    setView('intro');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Desktop Native Style */}
      <aside className="sidebar">
        <div className="sidebar-header drag-handle">
          <div className="brand">
            <LayoutDashboard size={20} color="var(--accent-primary)" />
            <span>Microsolvant</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="nav-label">Main</span>
            <div className="nav-item active">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </div>
            <div className="nav-item">
              <Users size={18} />
              <span>Clients</span>
            </div>
            <div className="nav-item">
              <CreditCard size={18} />
              <span>Loans</span>
            </div>
          </div>

          <div className="nav-group">
            <span className="nav-label">System</span>
            <div className="nav-item">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="user-info">
              <span className="user-name">Joel Doe</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          <NativeButton variant="ghost" size="sm" onClick={handleLogout} className="logout-btn">
            <LogOut size={16} />
          </NativeButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="content-header drag-handle">
          <div className="header-search">
            <Search size={16} />
            <input type="text" placeholder="Search for clients, loans..." />
          </div>
          
          <div className="header-actions">
            <NativeButton variant="secondary" size="sm" className="action-circle">
              <Bell size={18} />
            </NativeButton>
            <NativeButton variant="primary" size="sm" className="create-btn">
              <Plus size={18} /> New Loan
            </NativeButton>
          </div>
        </header>

        <div className="content-scrollable">
          <div className="content-container">
            <section className="dashboard-hero">
              <h1>Good afternoon, Joel</h1>
              <p>Here's what's happening with Microsolvant today.</p>
            </section>

            <section className="stats-grid">
              <div className="stats-card">
                <span className="stats-label">Total Portfolio</span>
                <span className="stats-value">UGX 4.2M</span>
                <span className="stats-trend positive">+12% from last month</span>
              </div>
              <div className="stats-card">
                <span className="stats-label">Active Loans</span>
                <span className="stats-value">128</span>
                <span className="stats-trend">Stable</span>
              </div>
              <div className="stats-card">
                <span className="stats-label">Repayments Today</span>
                <span className="stats-value">UGX 840k</span>
                <span className="stats-trend positive">+5% vs expected</span>
              </div>
            </section>

            <section className="recent-activity-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <NativeButton variant="ghost" size="sm">View All</NativeButton>
              </div>
              <div className="activity-list">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon">
                      <CreditCard size={16} />
                    </div>
                    <div className="activity-info">
                      <span className="activity-title">Loan #LK-90{i} Disbursed</span>
                      <span className="activity-detail">To Sento Joel • UGX 500,000</span>
                    </div>
                    <span className="activity-time">2h ago</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
