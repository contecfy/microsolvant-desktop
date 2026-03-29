import React from 'react';
import './NativeButton.css';

interface NativeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const NativeButton: React.FC<NativeButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`native-button ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NativeButton;
