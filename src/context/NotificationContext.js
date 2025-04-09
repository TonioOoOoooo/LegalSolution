import React, { createContext, useState, useCallback } from 'react';

// Création du contexte
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Fonction pour afficher une notification
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
    
    // Effacer la notification après un délai
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    // Nettoyer le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour effacer une notification
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Valeur du contexte
  const contextValue = {
    notification,
    showNotification,
    clearNotification
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};