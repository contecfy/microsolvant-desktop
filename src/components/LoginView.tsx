import React, { useState } from 'react';
import { Shield, ChevronLeft, LogIn, Loader2, Phone, Mail, Eye, EyeOff } from 'lucide-react';
import NativeButton from './NativeButton';
import NativeInput from './NativeInput';
import { useUIStore } from '../store/ui-store';
import { useAuthStore } from '../store/auth-store';
import apiClient from '../api/api-client';
import './LoginView.css';

const LoginView: React.FC = () => {
  const setView = useUIStore((state) => state.setView);
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [secret, setSecret] = useState(''); // password or pin
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const loginParams = 
      method === 'email' 
        ? { email: identifier.toLowerCase(), password: secret }
        : { phone: identifier, pin: secret };

    try {
      const response = await apiClient.post('/users/login', loginParams);
      const { user, token } = response.data;
      
      setAuth(user, token);
      setView('dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please check your credentials."
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
            <h2>Institutional<br/>Excellence</h2>
            <p>Gateway to premium capital management and institutional-grade micro-finance infrastructure.</p>
          </div>
        </div>
        <div className="visual-footer">
          <div className="status-indicator">
            <div className={`status-dot ${method === 'phone' ? 'active' : ''}`}></div>
            <div className={`status-dot ${method === 'email' ? 'active' : ''}`}></div>
          </div>
          <span className="security-text">System Security: Optimal</span>
        </div>
      </div>

      {/* Interaction Side */}
      <div className="login-interaction">
        <div className="interaction-container">
          <NativeButton 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('intro')}
            className="back-to-intro"
          >
            <ChevronLeft size={16} /> Return to Gateway
          </NativeButton>

          <div className="interaction-header">
            <h1>Sign In</h1>
            <p>Access your institutional account</p>
          </div>

          <div className="method-toggle">
            <button 
              className={method === 'phone' ? 'active' : ''} 
              onClick={() => { setMethod('phone'); setIdentifier(''); setSecret(''); }}
            >
              <Phone size={12} /> Phone
            </button>
            <button 
              className={method === 'email' ? 'active' : ''} 
              onClick={() => { setMethod('email'); setIdentifier(''); setSecret(''); }}
            >
              <Mail size={12} /> Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <NativeInput 
              label={method === 'email' ? 'Email Address' : 'Phone Number'} 
              type={method === 'email' ? 'email' : 'text'}
              placeholder={method === 'email' ? 'name@company.com' : '07XXXXXXXX'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            
            <div className="password-field">
              <NativeInput 
                label={method === 'email' ? 'Password' : 'Security PIN'} 
                type={method === 'email' && !showPassword ? 'password' : 'text'}
                placeholder={method === 'email' ? '••••••••' : '••••'}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                maxLength={method === 'phone' ? 4 : undefined}
                required
              />
              {method === 'email' && (
                <button 
                  type="button" 
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span>Stay signed in</span>
              </label>
              <button type="button" className="forgot-link">Recover access</button>
            </div>

            <NativeButton 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Access Account <LogIn size={18} /></>}
            </NativeButton>
          </form>

          <div className="login-footer">
            <div className="footer-divider"></div>
            <div className="footer-nav">
              <span>New institutional account?</span>
              <NativeButton variant="ghost" size="sm" onClick={() => setView('register')}>
                Register
              </NativeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
