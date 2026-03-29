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
      <div className="login-card">
        <div className="login-header">
          <NativeButton 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('intro')}
            className="back-btn"
          >
            <ChevronLeft size={16} />
          </NativeButton>
          <div className="login-brand">
            <Shield size={24} color="var(--accent-primary)" />
            <h2>Sign In</h2>
          </div>
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
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <NativeButton type="submit" variant="primary" size="lg" className="submit-btn">
            Login <LogIn size={18} />
          </NativeButton>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <NativeButton variant="ghost" size="sm" onClick={() => setView('register')}>
            Register
          </NativeButton>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
