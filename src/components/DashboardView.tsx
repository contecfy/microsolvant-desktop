import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Loader2,
  ArrowRight,
  Menu,
  Building2,
  ChevronLeft
} from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { useUIStore } from '../store/ui-store';
import NativeButton from './NativeButton';
import { LoanVolumeChart, PortfolioDonutChart } from './DashboardCharts';
import apiClient from '../api/api-client';
import AnalyticsView from './AnalyticsView';
import ReportsView from './ReportsView';
import LoansView from './LoansView';
import ClientsView from './ClientsView';
import StaffView from './StaffView';
import './DashboardView.css';

const DashboardView: React.FC = () => {
  const { user, logout, activeCompanyId, isAuthenticated } = useAuthStore();
  const { currentView, setView } = useUIStore();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalPortfolio: 0,
    activeLoans: 0,
    repaymentsToday: 0,
    loading: true
  });
  const [recentLoans, setRecentLoans] = useState<any[]>([]);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));
      
      // Fetch Loans for stats
      const { data: response } = await apiClient.get('/loans');
      const loans = response?.data || response || [];
      
      const totalPort = loans.reduce((acc: number, loan: any) => acc + (loan.amount || 0), 0);
      const activeCount = loans.filter((l: any) => l.status === 'ongoing' || l.status === 'active').length;
      
      // Process Portfolio Donut Data
      const ongoing = loans.filter((l: any) => l.status === 'ongoing' || l.status === 'active').length;
      const pending = loans.filter((l: any) => l.status === 'pending').length;
      const defaulted = loans.filter((l: any) => l.status === 'defaulted').length;
      const completed = loans.filter((l: any) => l.status === 'completed' || l.status === 'paid').length;

      setPortfolioData([
        { name: "Active", value: ongoing, color: "#3b82f6" }, 
        { name: "Arrears", value: pending, color: "#f59e0b" }, 
        { name: "Default", value: defaulted, color: "#ef4444" }, 
        { name: "Paid Off", value: completed, color: "#10b981" },
      ]);

      setStats({
        totalPortfolio: totalPort,
        activeLoans: activeCount,
        repaymentsToday: totalPort * 0.05, // Projected 5% daily repayment for demo
        loading: false
      });

      setRecentLoans(loans.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const fetchCompanyInfo = async () => {
    if (!activeCompanyId) return;
    
    try {
      // First try direct fetch
      const response = await apiClient.get(`/companies/${activeCompanyId}`);
      const active = response.data?.data || response.data;
      if (active) {
        setCompanyInfo(active);
      }
    } catch (error) {
      console.error('Error fetching company info directly:', error);
      
      // Fallback: search in list
      try {
        const response = await apiClient.get('/companies');
        const companies = response.data?.data || response.data || [];
        const active = Array.isArray(companies) 
          ? companies.find((c: any) => (c.id === activeCompanyId || c._id === activeCompanyId))
          : null;
        if (active) setCompanyInfo(active);
      } catch (innerError) {
        console.error('Fallback company fetch failed:', innerError);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
      fetchCompanyInfo();
    }
  }, [isAuthenticated, activeCompanyId]);

  const activeSubView = currentView;

  const handleLogout = () => {
    logout();
    setView('intro');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', { 
      style: 'currency', 
      currency: 'UGX',
      maximumFractionDigits: 0
    }).format(amount);
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
              <h1>Good afternoon, {user?.fullName?.split(' ')[0] || 'User'}</h1>
              <p>Here's what's happening with {companyInfo?.name || 'Microsolvant'} today.</p>
            </section>
 
            <section className="stats-grid">
              <div className="stats-card">
                <span className="stats-label">Total Portfolio</span>
                <span className="stats-value">
                  {stats.loading ? <Loader2 size={24} className="animate-spin" /> : formatCurrency(stats.totalPortfolio)}
                </span>
                <span className="stats-trend positive">+12.5% from last month</span>
              </div>
              <div className="stats-card">
                <span className="stats-label">Active Loans</span>
                <span className="stats-value">
                  {stats.loading ? <Loader2 size={24} className="animate-spin" /> : stats.activeLoans}
                </span>
                <span className="stats-trend">Institutional Load</span>
              </div>
              <div className="stats-card">
                <span className="stats-label">Projected Repayments</span>
                <span className="stats-value">
                  {stats.loading ? <Loader2 size={24} className="animate-spin" /> : formatCurrency(stats.repaymentsToday)}
                </span>
                <span className="stats-trend positive">+5% vs target</span>
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
                <PortfolioDonutChart data={portfolioData} />
              </div>
            </div>
 
            <section className="recent-activity-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <NativeButton variant="ghost" size="sm" onClick={() => setView('loans')}>View All</NativeButton>
              </div>
              <div className="activity-list">
                {recentLoans.length > 0 ? recentLoans.map((loan) => (
                  <div key={loan._id} className="activity-item">
                    <div className="activity-icon">
                      <CreditCard size={16} />
                    </div>
                    <div className="activity-info">
                      <span className="activity-title">Loan #{loan._id.slice(-6).toUpperCase()}</span>
                      <span className="activity-detail">
                        {typeof loan.client === 'object' ? loan.client.fullName : 'Client'} • {formatCurrency(loan.amount)}
                      </span>
                    </div>
                    <span className="activity-time">
                      {new Date(loan.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )) : (
                  <div className="empty-activity">No recent loan activity found.</div>
                )}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header drag-handle">
          <div className="brand" onClick={() => setView('dashboard')} style={{ cursor: 'pointer' }}>
            <LayoutDashboard size={20} color="var(--accent-primary)" />
            {!isSidebarCollapsed && <span>Microsolvant</span>}
          </div>
          {!isSidebarCollapsed && (
            <button 
              className="sidebar-toggle" 
              onClick={() => setIsSidebarCollapsed(true)}
              title="Collapse Sidebar"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>
 
        <nav className="sidebar-nav">
          <div className="nav-group">
            {!isSidebarCollapsed && <span className="nav-label">Management</span>}
            <div
              className={`nav-item ${activeSubView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView('dashboard')}
              title="Overview"
            >
              <LayoutDashboard size={18} />
              {!isSidebarCollapsed && <span>Overview</span>}
            </div>
            <div
              className={`nav-item ${activeSubView === 'clients' ? 'active' : ''}`}
              onClick={() => setView('clients')}
              title="Clients"
            >
              <Users size={18} />
              {!isSidebarCollapsed && <span>Clients</span>}
            </div>
            <div
              className={`nav-item ${activeSubView === 'loans' ? 'active' : ''}`}
              onClick={() => setView('loans')}
              title="Loans"
            >
              <ReceiptIndianRupee size={18} />
              {!isSidebarCollapsed && <span>Loans</span>}
            </div>
            <div
              className={`nav-item ${activeSubView === 'staff' ? 'active' : ''}`}
              onClick={() => setView('staff')}
              title="Team"
            >
              <ShieldCheck size={18} />
              {!isSidebarCollapsed && <span>Team</span>}
            </div>
          </div>
 
          <div className="nav-group">
            {!isSidebarCollapsed && <span className="nav-label">Finance</span>}
            <div className="nav-item" title="Investments">
              <TrendingUp size={18} />
              {!isSidebarCollapsed && <span>Investments</span>}
            </div>
          </div>
 
          <div className="nav-group">
            {!isSidebarCollapsed && <span className="nav-label">Insights</span>}
            <div
              className={`nav-item ${activeSubView === 'reports' ? 'active' : ''}`}
              onClick={() => setView('reports')}
              title="Reports"
            >
              <BarChart3 size={18} />
              {!isSidebarCollapsed && <span>Reports</span>}
            </div>
            <div
              className={`nav-item ${activeSubView === 'analytics' ? 'active' : ''}`}
              onClick={() => setView('analytics')}
              title="Analytics"
            >
              <PieChartIcon size={18} />
              {!isSidebarCollapsed && <span>Analytics</span>}
            </div>
          </div>
 
          <div className="nav-group">
            {!isSidebarCollapsed && <span className="nav-label">System</span>}
            <div className="nav-item" title="Billing">
              <Bell size={18} />
              {!isSidebarCollapsed && <span>Billing</span>}
            </div>
            <div
              className={`nav-item ${activeSubView === 'settings' ? 'active' : ''}`}
              onClick={() => setView('settings')}
              title="Settings"
            >
              <Settings size={18} />
              {!isSidebarCollapsed && <span>Settings</span>}
            </div>
          </div>
        </nav>
 
        <div className="sidebar-footer-next">
          <div className={`company-section-btn ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="company-icon-box">
              {companyInfo?.logo ? (
                <img src={companyInfo.logo} alt="Logo" className="company-logo-img" />
              ) : (
                <Building2 size={20} />
              )}
            </div>
            {!isSidebarCollapsed && (
              <div className="company-text-content">
                <p className="company-name-label">
                  {companyInfo?.name || "Institution"}
                </p>
                <p className="company-status-label">
                  Institutional Account
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
 
      <main className="dashboard-main">
        <header className="content-header drag-handle">
          <div className="header-left">
            {isSidebarCollapsed && (
              <button 
                className="header-toggle-btn"
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expand Sidebar"
              >
                <Menu size={20} />
              </button>
            )}
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
                  <div className="avatar">{user?.fullName?.charAt(0) || 'U'}</div>
                  <div className="user-meta">
                    <span className="u-name">{user?.fullName || 'User Profile'}</span>
                    <span className="u-role">{user?.role?.replace('_', ' ') || 'Guest'}</span>
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
