import React, { useState } from 'react';
import { Shield, ChevronLeft, LogIn } from 'lucide-react';
import NativeButton from './NativeButton';
import NativeInput from './NativeInput';
import { useUIStore } from '../store/ui-store';
import './LoginView.css';

const LoginView: React.FC = () => {
  const setView = useUIStore((state) => state.setView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login will go here
    console.log('Login attempt:', email);
    // For now, let's just go to dashboard
    setView('dashboard');
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
            <div className="status-dot active"></div>
            <div className="status-dot"></div>
            <div className="status-dot"></div>
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
            <ChevronLeft size={16} style={{ marginRight: '8px' }} /> Return to Gateway
          </NativeButton>

          <div className="interaction-header">
            <h1>Sign In</h1>
            <p>Access your institutional account</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <NativeInput 
              label="Email Address" 
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <NativeInput 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span>Stay signed in</span>
              </label>
              <a href="#" className="forgot-link">Recover access</a>
            </div>

            <NativeButton type="submit" variant="primary" size="lg" className="submit-btn" style={{ marginTop: '12px' }}>
              Access Account <LogIn size={18} />
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
