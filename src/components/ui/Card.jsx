import React from 'react';
import { RefreshCw } from 'lucide-react';
import Button from './Button';

const Card = ({ 
  title, 
  icon, 
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  children, 
  onRefresh,
  isLoading = false,
  lastSync = null,
  className = '',
  ...props 
}) => {
  // Fonction pour formater la date de dernière synchronisation
  const formatDate = (date) => {
    if (!date) return 'Jamais';
    if (typeof date === 'string') return date;
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`bg-white shadow rounded-lg p-6 mb-6 ${className}`} {...props}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {icon && (
            <div className={`h-10 w-10 rounded-full ${iconBgColor} flex items-center justify-center mr-3`}>
              {React.cloneElement(icon, { className: `h-6 w-6 ${iconColor}` })}
            </div>
          )}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        
        {onRefresh && (
          <div className="flex space-x-2">
            <Button 
              onClick={onRefresh}
              disabled={isLoading}
              isLoading={isLoading}
              color="light"
              size="sm"
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Synchroniser
            </Button>
            {lastSync && (
              <div className="text-xs text-gray-500 flex items-center">
                Dernière synchro: {formatDate(lastSync)}
              </div>
            )}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default Card;