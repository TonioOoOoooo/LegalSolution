import React from 'react';
import { RefreshCw } from 'lucide-react';

const Button = ({ 
  children, 
  onClick, 
  color = 'blue',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon = null,
  className = '',
  type = 'button',
  ...props 
}) => {
  // Définir les classes CSS en fonction des props
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white',
    green: 'bg-green-600 hover:bg-green-700 text-white',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white',
    light: 'bg-blue-100 hover:bg-blue-200 text-blue-700'
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors';
  const classes = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
      )}
      {!isLoading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;