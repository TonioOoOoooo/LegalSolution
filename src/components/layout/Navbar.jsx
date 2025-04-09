import React from 'react';
import { FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

const Navbar = () => {
  const { isAuthenticated, logout, openLoginModal } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Cabinet Magnan - Gestion des documents
            </span>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <Button 
                onClick={logout}
                color="red"
                className="ml-4"
              >
                Déconnexion
              </Button>
            ) : (
              <Button 
                onClick={openLoginModal}
                color="blue"
                className="ml-4"
              >
                Connexion
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;