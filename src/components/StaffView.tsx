import React, { useState, useEffect } from 'react';
import { UserCheck, Shield, Mail, Loader2 } from 'lucide-react';
import NativeButton from './NativeButton';
import apiClient from '../api/api-client';
import './DashboardView.css';

const StaffView: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/users');
        // Filter out clients and investors to get staff
        const filtered = data.filter((u: any) => u.role !== 'client' && u.role !== 'investor');
        setStaff(filtered);
      } catch (err) {
        console.error('Failed to fetch staff', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

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

      {loading ? (
        <div className="loading-state">
          <Loader2 size={32} className="animate-spin" />
          <span>Verifying institutional access...</span>
        </div>
      ) : (
        <div className="staff-list">
          {staff.length > 0 ? staff.map((member) => (
            <div key={member._id} className="staff-item">
               <div className="staff-main">
                  <div className="avatar">{member.fullName.charAt(0)}</div>
                  <div className="staff-info">
                      <span className="staff-name">{member.fullName}</span>
                      <span className="staff-role">
                        <Shield size={12} /> {member.role.replace('_', ' ').toUpperCase()}
                      </span>
                  </div>
               </div>
               <div className="staff-contact">
                  <span className="staff-email"><Mail size={14} /> {member.email}</span>
               </div>
               <div className="staff-status">
                  <span className={`status-indicator online`}></span>
                  <span>Institutional Member</span>
               </div>
               <div className="staff-actions">
                  <NativeButton variant="secondary" size="sm">Permissions</NativeButton>
               </div>
            </div>
          )) : (
            <div className="empty-state-full">
              No institutional staff members found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffView;
