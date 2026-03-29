import React from 'react';
import { UserCheck, Shield, Mail, Clock } from 'lucide-react';
import NativeButton from './NativeButton';
import './DashboardView.css';

const StaffView: React.FC = () => {
  const staff = [
    { id: 'ST-01', name: 'Joel Doe', role: 'Administrator', email: 'joel@microsolvant.com', status: 'Online' },
    { id: 'ST-02', name: 'Sarah Smith', role: 'Loan Officer', email: 'sarah@microsolvant.com', status: 'Offline' },
    { id: 'ST-03', name: 'James Brown', role: 'Accountant', email: 'james@microsolvant.com', status: 'Online' },
  ];

  return (
    <div className="content-container">
      <header className="view-header">
        <div>
          <h1>Team Management</h1>
          <p>Manage system users, roles, and institutional permissions.</p>
        </div>
        <div className="view-actions">
          <NativeButton variant="primary" size="sm">
            <UserCheck size={16} /> Add Member
          </NativeButton>
        </div>
      </header>

      <div className="staff-list">
        {staff.map((member) => (
          <div key={member.id} className="staff-item">
             <div className="staff-main">
                <div className="avatar">{member.name.charAt(0)}</div>
                <div className="staff-info">
                    <span className="staff-name">{member.name}</span>
                    <span className="staff-role"><Shield size={12} /> {member.role}</span>
                </div>
             </div>
             <div className="staff-contact">
                <span className="staff-email"><Mail size={14} /> {member.email}</span>
             </div>
             <div className="staff-status">
                <span className={`status-indicator ${member.status.toLowerCase()}`}></span>
                <span>{member.status === 'Online' ? 'Active Now' : 'Last seen 2h ago'}</span>
             </div>
             <div className="staff-actions">
                <NativeButton variant="secondary" size="sm">Permissions</NativeButton>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffView;
