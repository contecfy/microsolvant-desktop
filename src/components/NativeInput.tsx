import React from 'react';
import './NativeInput.css';

interface NativeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const NativeInput: React.FC<NativeInputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`native-input-container ${className}`}>
      {label && <label className="native-input-label">{label}</label>}
      <input 
        className={`native-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <span className="native-input-error">{error}</span>}
    </div>
  );
};

export default NativeInput;
