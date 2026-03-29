import React from 'react';
import { Search, Plus, Calendar, UserCircle2, ArrowRight } from 'lucide-react';
import NativeButton from './NativeButton';
import './DashboardView.css';

const LoansView: React.FC = () => {
  const loans = [
    { id: 'LN-1001', client: 'Sento Joel', principal: 500000, interest: 25000, due: '2026-04-12', status: 'Ongoing', risk: 'Green' },
    { id: 'LN-1002', client: 'Alice Nambuya', principal: 1200000, interest: 60000, due: '2026-04-05', status: 'Pending', risk: 'Yellow' },
    { id: 'LN-1003', client: 'Bob Kasule', principal: 300000, interest: 15000, due: '2026-03-28', status: 'Arrears', risk: 'Red' },
  ];

  return (
    <div className="content-container">
      <header className="view-header">
        <div>
          <h1>Loan Management</h1>
          <p>Track and manage client loans and repayment schedules.</p>
        </div>
        <div className="view-actions">
          <NativeButton variant="primary" size="sm">
            <Plus size={16} /> Create New Loan
          </NativeButton>
        </div>
      </header>

      <div className="reports-filter-bar">
        <div className="grid-filter">
          <div className="header-search">
            <Search size={16} />
            <input type="text" placeholder="Search by name or ID..." />
          </div>
          <div className="stats-mini-card">
            <span className="mini-label">ACTIVE LOANS</span>
            <span className="mini-value">{loans.length}</span>
          </div>
        </div>
      </div>

      <div className="data-table-container">
        <table className="native-table">
          <thead>
            <tr>
              <th>Borrower</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Next Due</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>
                  <div className="table-user">
                    <UserCircle2 size={18} />
                    <div>
                      <span className="user-primary">{loan.client}</span>
                      <span className="user-secondary">{loan.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="val-principal">UGX {loan.principal.toLocaleString()}</span>
                </td>
                <td>
                  <span className="val-interest">5% (UGX {loan.interest.toLocaleString()})</span>
                </td>
                <td>
                    <span className="val-date">{loan.due}</span>
                </td>
                <td>
                  <span className={`status-pill ${loan.status.toLowerCase()}`}>
                    <span className={`risk-dot ${loan.risk.toLowerCase()}`}></span>
                    {loan.status}
                  </span>
                </td>
                <td className="text-right">
                  <NativeButton variant="ghost" size="sm" className="table-btn">
                    Details <ArrowRight size={14} />
                  </NativeButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoansView;
