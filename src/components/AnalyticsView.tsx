import React from 'react';
import { TrendingUp, ArrowUpRight, Filter, Download } from 'lucide-react';
import { LoanVolumeChart, PortfolioDonutChart } from './DashboardCharts';
import NativeButton from './NativeButton';
import './DashboardView.css';

const AnalyticsView: React.FC = () => {
  return (
    <div className="content-container">
      <header className="view-header">
        <div>
          <h1>Analytics & Insights</h1>
          <p>Deep dive into your portfolio performance and trends.</p>
        </div>
        <div className="view-actions">
          <NativeButton variant="secondary" size="sm">
            <Filter size={16} /> Filter Date
          </NativeButton>
          <NativeButton variant="primary" size="sm">
            <Download size={16} /> Export Data
          </NativeButton>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stats-card highlight">
          <span className="stats-label">Net Projected Yield</span>
          <span className="stats-value">24.8%</span>
          <span className="stats-trend positive">+2.1% from target</span>
        </div>
        <div className="stats-card">
          <span className="stats-label">Avg. Loan Tenure</span>
          <span className="stats-value">4.2 Months</span>
          <span className="stats-trend">Stable</span>
        </div>
        <div className="stats-card">
          <span className="stats-label">Default Risk Rate</span>
          <span className="stats-value">3.2%</span>
          <span className="stats-trend positive">-0.5% this week</span>
        </div>
      </section>

      <div className="charts-main-grid">
        <div className="chart-container large">
          <div className="chart-header">
            <h3>Loan Volume Trends</h3>
            <p>Historical data of dispensed vs collected funds.</p>
          </div>
          <LoanVolumeChart />
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <h3>Portfolio Health</h3>
            <p>Distribution of active loan statuses.</p>
          </div>
          <PortfolioDonutChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
