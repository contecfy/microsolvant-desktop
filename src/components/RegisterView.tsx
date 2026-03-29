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
            <h2>Create Account</h2>
          </div>
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
            Register <UserPlus size={18} />
          </NativeButton>
        </form>

        <div className="login-footer">
          <span>Already have an account?</span>
          <NativeButton variant="ghost" size="sm" onClick={() => setView('login')}>
            Sign In
          </NativeButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
