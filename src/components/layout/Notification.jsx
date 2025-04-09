import React from 'react';
import { Check, AlertTriangle, FileText } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const { type, message } = notification;

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <Check className="h-5 w-5 text-green-500" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <FileText className="h-5 w-5 text-blue-500" />
    }
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${style.bg} border ${style.border}`}>
      <div className="flex items-center">
        {style.icon}
        <p className={`ml-3 text-sm font-medium ${style.text}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Notification;