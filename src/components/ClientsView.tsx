import React from 'react';
import { Search, Plus, User, Phone, MapPin } from 'lucide-react';
import NativeButton from './NativeButton';
import './DashboardView.css';

const ClientsView: React.FC = () => {
  const clients = [
    { id: 'CL-001', name: 'Sento Joel', phone: '+256 700 000 000', location: 'Kampala', status: 'Active' },
    { id: 'CL-002', name: 'Alice Nambuya', phone: '+256 701 111 111', location: 'Entebbe', status: 'Active' },
    { id: 'CL-003', name: 'Bob Kasule', phone: '+256 702 222 222', location: 'Wakiso', status: 'Inactive' },
  ];

  return (
    <div className="content-container">
      <header className="view-header">
        <div>
          <h1>Client Directory</h1>
          <p>Global list of all registered borrowers and institutions.</p>
        </div>
        <div className="view-actions">
          <NativeButton variant="primary" size="sm">
            <Plus size={16} /> Register Client
          </NativeButton>
        </div>
      </header>

      <div className="reports-filter-bar">
        <div className="header-search">
          <Search size={16} />
          <input type="text" placeholder="Search clients..." />
        </div>
      </div>

      <div className="clients-grid">
        {clients.map((client) => (
          <div key={client.id} className="client-card">
            <div className="client-header">
                <div className="client-avatar">
                   <User size={24} />
                </div>
                <div className="client-meta">
                    <span className="client-name">{client.name}</span>
                    <span className="client-id">{client.id}</span>
                </div>
            </div>
            <div className="client-details">
                <div className="detail-item">
                    <Phone size={14} /> {client.phone}
                </div>
                <div className="detail-item">
                    <MapPin size={14} /> {client.location}
                </div>
            </div>
            <div className="client-footer">
                <span className={`status-pill ${client.status.toLowerCase()}`}>{client.status}</span>
                <NativeButton variant="ghost" size="sm">View Profile</NativeButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsView;
