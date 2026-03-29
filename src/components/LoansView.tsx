import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, UserCircle2, ArrowRight, Loader2 } from 'lucide-react';
import NativeButton from './NativeButton';
import apiClient from '../api/api-client';
import './DashboardView.css';

const LoansView: React.FC = () => {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/loans');
        setLoans(data);
      } catch (err) {
        console.error('Failed to fetch loans', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const filteredLoans = loans.filter(loan => {
    const clientName = typeof loan.client === 'object' ? loan.client.fullName : 'Unknown';
    return clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           loan._id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', { 
      style: 'currency', 
      currency: 'UGX',
      maximumFractionDigits: 0
    }).format(amount);
  };

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
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="stats-mini-card">
            <span className="mini-label">ACTIVE LOANS</span>
            <span className="mini-value">{loading ? '...' : loans.length}</span>
          </div>
        </div>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div className="loading-state">
            <Loader2 size={32} className="animate-spin" />
            <span>Fetching loan ledger...</span>
          </div>
        ) : (
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
              {filteredLoans.length > 0 ? filteredLoans.map((loan) => (
                <tr key={loan._id}>
                  <td>
                    <div className="table-user">
                      <UserCircle2 size={18} />
                      <div>
                        <span className="user-primary">
                          {typeof loan.client === 'object' ? loan.client.fullName : 'Unknown'}
                        </span>
                        <span className="user-secondary">{loan._id.slice(-8).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="val-principal">{formatCurrency(loan.amount)}</span>
                  </td>
                  <td>
                    <span className="val-interest">{loan.interestRate}% ({formatCurrency(loan.interestAmount)})</span>
                  </td>
                  <td>
                      <span className="val-date">{new Date(loan.dueDate).toLocaleDateString()}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${loan.status.toLowerCase()}`}>
                      <span className={`risk-dot ${loan.riskStatus.toLowerCase()}`}></span>
                      {loan.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <NativeButton variant="ghost" size="sm" className="table-btn">
                      Details <ArrowRight size={14} />
                    </NativeButton>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    No loans found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LoansView;
