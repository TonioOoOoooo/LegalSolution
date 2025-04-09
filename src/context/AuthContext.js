import React, { createContext, useState, useCallback } from 'react';
import authService from '../services/authService';
import { useNotification } from '../hooks/useNotification';

// Création du contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  // Fonction pour gérer la connexion
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      // Appel au service d'authentification (à implémenter avec Firebase)
      const userData = await authService.login(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      showNotification('success', 'Connexion réussie');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      showNotification('error', 'Erreur de connexion: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Fonction pour gérer la déconnexion
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      showNotification('info', 'Vous êtes déconnecté');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      showNotification('error', 'Erreur de déconnexion: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Fonction pour ouvrir/fermer la modal de connexion
  const openLoginModal = useCallback((isOpen = true) => {
    setIsLoginModalOpen(isOpen);
  }, []);

  // Valeur du contexte
  const contextValue = {
    isAuthenticated,
    user,
    isLoginModalOpen,
    isLoading,
    login,
    logout,
    openLoginModal
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};