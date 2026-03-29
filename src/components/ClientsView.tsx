import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Phone, MapPin, Loader2 } from 'lucide-react';
import NativeButton from './NativeButton';
import apiClient from '../api/api-client';
import './DashboardView.css';

const ClientsView: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/users');
        // Filter for clients only
        const filtered = data.filter((u: any) => u.role === 'client');
        setClients(filtered);
      } catch (err) {
        console.error('Failed to fetch clients', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => 
    client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

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
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 size={32} className="animate-spin" />
          <span>Syncing client directory...</span>
        </div>
      ) : (
        <div className="clients-grid">
          {filteredClients.length > 0 ? filteredClients.map((client) => (
            <div key={client._id} className="client-card">
              <div className="client-header">
                  <div className="client-avatar">
                     <User size={24} />
                  </div>
                  <div className="client-meta">
                      <span className="client-name">{client.fullName}</span>
                      <span className="client-id">{client._id.slice(-6).toUpperCase()}</span>
                  </div>
              </div>
              <div className="client-details">
                  <div className="detail-item">
                      <Phone size={14} /> {client.phone || 'No phone'}
                  </div>
                  <div className="detail-item">
                      <MapPin size={14} /> {client.nationalId || 'No ID'}
                  </div>
              </div>
              <div className="client-footer">
                  <span className={`status-pill active`}>Active Member</span>
                  <NativeButton variant="ghost" size="sm">View Profile</NativeButton>
              </div>
            </div>
          )) : (
            <div className="empty-state-full">
              No clients found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientsView;
