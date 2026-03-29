import React from 'react';
import { FileText, Download, Eye, Clock, Search } from 'lucide-react';
import NativeButton from './NativeButton';
import './DashboardView.css';

const ReportsView: React.FC = () => {
  const reports = [
    { id: 'REP-001', name: 'Monthly Financial Statement', date: 'Mar 2026', type: 'PDF', size: '2.4 MB' },
    { id: 'REP-002', name: 'Loan Disbursement Audit', date: 'Feb 2026', type: 'XLSX', size: '1.1 MB' },
    { id: 'REP-003', name: 'Client Demographic Analysis', date: 'Jan 2026', type: 'PDF', size: '4.8 MB' },
    { id: 'REP-004', name: 'Year-to-Date Collections', date: '2025-2026', type: 'XLSX', size: '12.2 MB' },
  ];

  return (
    <div className="content-container">
      <header className="view-header">
        <div>
          <h1>System Reports</h1>
          <p>Access and download institutional financial reports.</p>
        </div>
        <div className="view-actions">
          <NativeButton variant="primary" size="sm">
             Generate New Report
          </NativeButton>
        </div>
      </header>

      <div className="reports-filter-bar">
        <div className="header-search">
          <Search size={16} />
          <input type="text" placeholder="Filter reports by name or date..." />
        </div>
      </div>

      <div className="reports-list">
        {reports.map((report) => (
          <div key={report.id} className="report-item">
            <div className="report-icon">
              <FileText size={20} />
            </div>
            <div className="report-main">
              <span className="report-name">{report.name}</span>
              <div className="report-meta">
                <span className="report-date"><Clock size={12} /> {report.date}</span>
                <span className="report-tag">{report.type}</span>
                <span className="report-size">{report.size}</span>
              </div>
            </div>
            <div className="report-actions">
              <NativeButton variant="ghost" size="sm" className="icon-only">
                <Eye size={16} />
              </NativeButton>
              <NativeButton variant="ghost" size="sm" className="icon-only">
                <Download size={16} />
              </NativeButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
