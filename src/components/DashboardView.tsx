import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Plus,
  BarChart3,
  PieChart as PieChartIcon,
  ReceiptIndianRupee,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { useUIStore } from '../store/ui-store';
import NativeButton from './NativeButton';
import { LoanVolumeChart, PortfolioDonutChart } from './DashboardCharts';
import AnalyticsView from './AnalyticsView';
import ReportsView from './ReportsView';
import LoansView from './LoansView';
import ClientsView from './ClientsView';
import StaffView from './StaffView';
import './DashboardView.css';

const DashboardView: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const { currentView, setView } = useUIStore();

  const activeSubView = currentView;

  const handleLogout = () => {
    logout();
    setView('intro');
  };

  const renderContent = () => {
    switch (activeSubView) {
      case 'analytics': return <AnalyticsView />;
      case 'reports': return <ReportsView />;
      case 'loans': return <LoansView />;
      case 'clients': return <ClientsView />;
      case 'staff': return <StaffView />;
      default:
        return (
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

            <div className="charts-main-grid">
              <div className="chart-container large">
                <div className="chart-header">
                  <h3>Loan Performance</h3>
                  <p>Dispensed vs Collected (Last 6 Months)</p>
                </div>
                <LoanVolumeChart />
              </div>
              
              <div className="chart-container">
                <div className="chart-header">
                  <h3>Portfolio Health</h3>
                  <p>Current active loan status</p>
                </div>
                <PortfolioDonutChart />
              </div>
            </div>

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
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header drag-handle">
          <div className="brand">
            <LayoutDashboard size={20} color="var(--accent-primary)" />
            <span>Microsolvant</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="nav-label">Management</span>
            <div 
              className={`nav-item ${activeSubView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </div>
            <div 
              className={`nav-item ${activeSubView === 'clients' ? 'active' : ''}`}
              onClick={() => setView('clients')}
            >
              <Users size={18} />
              <span>Clients</span>
            </div>
            <div 
              className={`nav-item ${activeSubView === 'loans' ? 'active' : ''}`}
              onClick={() => setView('loans')}
            >
              <ReceiptIndianRupee size={18} />
              <span>Loans</span>
            </div>
            <div 
              className={`nav-item ${activeSubView === 'staff' ? 'active' : ''}`}
              onClick={() => setView('staff')}
            >
              <ShieldCheck size={18} />
              <span>Team</span>
            </div>
          </div>

          <div className="nav-group">
            <span className="nav-label">Finance</span>
            <div className="nav-item">
              <TrendingUp size={18} />
              <span>Investments</span>
            </div>
          </div>

          <div className="nav-group">
            <span className="nav-label">Insights</span>
            <div 
              className={`nav-item ${activeSubView === 'reports' ? 'active' : ''}`}
              onClick={() => setView('reports')}
            >
              <BarChart3 size={18} />
              <span>Reports</span>
            </div>
            <div 
              className={`nav-item ${activeSubView === 'analytics' ? 'active' : ''}`}
              onClick={() => setView('analytics')}
            >
              <PieChartIcon size={18} />
              <span>Analytics</span>
            </div>
          </div>

          <div className="nav-group">
            <span className="nav-label">System</span>
            <div className="nav-item">
              <Bell size={18} />
              <span>Billing</span>
            </div>
            <div 
              className={`nav-item ${activeSubView === 'settings' ? 'active' : ''}`}
              onClick={() => setView('settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="company-badge">
            <div className="company-icon">
              <ShieldCheck size={16} />
            </div>
            <div className="company-info">
              <span className="company-name">Microsolvant Inst.</span>
              <span className="company-type">Institutional Account</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="content-header drag-handle">
          <div className="header-left">
            <div className="system-status">
              <div className="status-indicator"></div>
              <span>System Active</span>
            </div>
          </div>

          <div className="header-center">
            <div className="header-search">
              <Search size={16} />
              <input type="text" placeholder="Search loans, clients, reports..." />
            </div>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              <NativeButton variant="secondary" size="sm" className="action-circle">
                <Bell size={18} />
              </NativeButton>
              <div className="v-divider"></div>
              <div className="user-nav">
                <div className="user-profile-trigger">
                  <div className="avatar">JD</div>
                  <div className="user-meta">
                    <span className="u-name">Joel Doe</span>
                    <span className="u-role">Administrator</span>
                  </div>
                </div>
                <NativeButton variant="ghost" size="sm" onClick={handleLogout} className="icon-only">
                  <LogOut size={16} />
                </NativeButton>
              </div>
            </div>
          </div>
        </header>

        <div className="content-scrollable">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
