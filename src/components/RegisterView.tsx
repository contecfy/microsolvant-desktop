import React, { useState } from 'react';
import { Shield, ChevronLeft, UserPlus } from 'lucide-react';
import NativeButton from './NativeButton';
import NativeInput from './NativeInput';
import { useUIStore } from '../store/ui-store';
import './LoginView.css'; // Reusing some login styles

const RegisterView: React.FC = () => {
  const setView = useUIStore((state) => state.setView);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', email);
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
            <h2>Start your<br/>Journey</h2>
            <p>Join the future of micro-finance with our professional capital management infrastructure.</p>
          </div>
        </div>

        <div className="visual-footer">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <div className="status-dot active"></div>
            <div className="status-dot"></div>
          </div>
          <span className="security-text">Encrypted Registration Active</span>
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
            <h1>Create Account</h1>
            <p>Onboard your institution today</p>
          </div>

          <form onSubmit={handleRegister} className="login-form">
            <NativeInput 
              label="Full Name" 
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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

            <NativeButton type="submit" variant="primary" size="lg" className="submit-btn" style={{ marginTop: '12px' }}>
              Create Account <UserPlus size={18} />
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
