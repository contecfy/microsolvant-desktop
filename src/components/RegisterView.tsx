import React, { useState, useEffect } from 'react';
import { Shield, ChevronLeft, UserPlus, Loader2, Building, Briefcase } from 'lucide-react';
import NativeButton from './NativeButton';
import NativeInput from './NativeInput';
import { useUIStore } from '../store/ui-store';
import { useAuthStore } from '../store/auth-store';
import apiClient from '../api/api-client';
import './LoginView.css';

const roles = [
  { value: 'loan_officer', label: 'Loan Officer' },
  { value: 'manager', label: 'Manager' },
  { value: 'accountant', label: 'Accountant' },
  { value: 'collector', label: 'Collector' },
];

const RegisterView: React.FC = () => {
  const setView = useUIStore((state) => state.setView);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    pin: '',
    nationalId: '',
    companyId: '',
    role: 'loan_officer',
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await apiClient.get('/companies/public/list');
        setCompanies(data);
      } catch (err) {
        console.error('Failed to fetch companies', err);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        companies: [formData.companyId],
      };
      const response = await apiClient.post('/users', payload);
      const { user, token } = response.data;
      
      setAuth(user, token);
      setView('dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Registration failed. Please check your information."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      {/* Visual Side */}
      <div className="login-visual">
        <img 
          src="https://images.pexels.com/photos/34926382/pexels-photo-34926382.jpeg" 
          alt="Banking Background" 
        />
        <div className="visual-content">
          <div className="visual-brand">
            <Shield size={28} color="#fff" />
            <h1>Microsolvant</h1>
          </div>
          <div className="visual-message">
            <h2>Start your<br/>Journey</h2>
            <p>Join the future of micro-finance with our professional capital management infrastructure.</p>
          </div>
        </div>
        <div className="visual-footer">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <div className="status-dot active"></div>
          </div>
          <span className="security-text">Encrypted Registration Active</span>
        </div>
      </div>

      {/* Interaction Side */}
      <div className="login-interaction register-interaction">
        <div className="interaction-container register-container">
          <NativeButton 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('intro')}
            className="back-to-intro"
          >
            <ChevronLeft size={16} /> Return to Gateway
          </NativeButton>

          <div className="interaction-header">
            <h1>Create Account</h1>
            <p>Onboard your institution today</p>
          </div>

          <form onSubmit={handleRegister} className="login-form register-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-grid">
              <NativeInput 
                label="Full Name" 
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <NativeInput 
                label="Username" 
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <NativeInput 
                label="Email Address" 
                name="email"
                type="email" 
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <NativeInput 
                label="Phone Number" 
                name="phone"
                placeholder="07XXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <NativeInput 
                label="National ID" 
                name="nationalId"
                placeholder="ID Number"
                value={formData.nationalId}
                onChange={handleChange}
                required
              />
              <NativeInput 
                label="Auth PIN" 
                name="pin"
                placeholder="••••"
                value={formData.pin}
                onChange={handleChange}
                maxLength={4}
                required
              />
              
              <div className="select-field">
                <label>Select Company</label>
                <div className="select-wrapper">
                  <Building size={14} className="select-icon" />
                  <select name="companyId" value={formData.companyId} onChange={handleChange} required>
                    <option value="">Choose Company</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="select-field">
                <label>Institutional Role</label>
                <div className="select-wrapper">
                  <Briefcase size={14} className="select-icon" />
                  <select name="role" value={formData.role} onChange={handleChange} required>
                    {roles.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid-full">
                <NativeInput 
                  label="Password" 
                  name="password"
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <NativeButton 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <UserPlus size={18} /></>}
            </NativeButton>
          </form>

          <div className="login-footer">
            <div className="footer-divider"></div>
            <div className="footer-nav">
              <span>Already have an account?</span>
              <NativeButton variant="ghost" size="sm" onClick={() => setView('login')}>
                Sign In
              </NativeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
