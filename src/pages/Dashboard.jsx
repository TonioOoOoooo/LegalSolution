import React from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AttachmentsSection from './AttachmentsSection';
import ConclusionsSection from './ConclusionsSection';
import ResultSection from './ResultSection';
import Button from '../components/ui/Button';
import LoginModal from '../components/auth/LoginModal';
import Notification from '../components/layout/Notification';

const Dashboard = () => {
  const { isAuthenticated, openLoginModal, isLoginModalOpen } = useAuth();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Notification />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => openLoginModal(false)} 
        onLogin={() => {}} // Sera géré par le hook useAuth
      />

      {!isAuthenticated && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center">
            <Lock className="h-6 w-6 text-gray-500 mr-2" />
            <p className="text-gray-500">Veuillez vous connecter pour accéder à l'application</p>
            <Button 
              onClick={() => openLoginModal(true)}
              color="blue"
              className="ml-4"
            >
              Connexion
            </Button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <>
          <AttachmentsSection />
          <ConclusionsSection />
          <ResultSection />
        </>
      )}
    </div>
  );
};

export default Dashboard;