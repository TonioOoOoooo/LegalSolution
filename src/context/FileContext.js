import React, { createContext, useState, useCallback } from 'react';
import oneDriveService from '../services/oneDriveService';
import webhookService from '../services/webhookService';
import { useNotification } from '../hooks/useNotification';

// Création du contexte
export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  // États des fichiers
  const [attachments, setAttachments] = useState([]);
  const [conclusions, setConclusions] = useState([]);
  const [result, setResult] = useState(null);
  
  // États de chargement
  const [isLoading, setIsLoading] = useState({
    attachments: false,
    conclusions: false,
    result: false
  });
  
  // États de synchronisation
  const [lastSync, setLastSync] = useState({
    attachments: null,
    conclusions: null,
    result: null
  });

  const { showNotification } = useNotification();

  // Fonction pour récupérer les fichiers à joindre
  const fetchAttachments = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, attachments: true }));
    try {
      const files = await oneDriveService.getOneDriveFiles('attachments');
      setAttachments(files);
      setLastSync(prev => ({ ...prev, attachments: new Date() }));
      showNotification('success', 'Fichiers à joindre synchronisés avec OneDrive');
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers à joindre:', error);
      showNotification('error', 'Erreur lors de la synchronisation des fichiers à joindre');
    } finally {
      setIsLoading(prev => ({ ...prev, attachments: false }));
    }
  }, [showNotification]);

  // Fonction pour récupérer les fichiers de conclusion
  const fetchConclusions = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, conclusions: true }));
    try {
      const files = await oneDriveService.getOneDriveFiles('conclusions');
      setConclusions(files);
      setLastSync(prev => ({ ...prev, conclusions: new Date() }));
      showNotification('success', 'Fichiers de conclusion synchronisés avec OneDrive');
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers de conclusion:', error);
      showNotification('error', 'Erreur lors de la synchronisation des fichiers de conclusion');
    } finally {
      setIsLoading(prev => ({ ...prev, conclusions: false }));
    }
  }, [showNotification]);

  // Fonction pour récupérer le résultat
  const fetchResults = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, result: true }));
    try {
      const resultFile = await oneDriveService.getResultFile();
      setResult(resultFile);
      setLastSync(prev => ({ ...prev, result: new Date() }));
    } catch (error) {
      console.error('Erreur lors de la récupération du résultat:', error);
      showNotification('error', 'Erreur lors de la récupération du résultat');
    } finally {
      setIsLoading(prev => ({ ...prev, result: false }));
    }
  }, [showNotification]);

  // Fonction pour ajouter un fichier
  const addFile = useCallback(async (type) => {
    try {
      // Ouvrir le sélecteur de fichier OneDrive
      const selectedFile = await oneDriveService.selectFile();
      
      if (!selectedFile) return;
      
      if (type === 'attachment') {
        setAttachments(prev => [...prev, selectedFile]);
        showNotification('info', 'Fichier ajouté à la liste des pièces à joindre');
      } else if (type === 'conclusion') {
        setConclusions(prev => [...prev, selectedFile]);
        showNotification('info', 'Fichier ajouté à la liste des conclusions');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du fichier:', error);
      showNotification('error', 'Erreur lors de l\'ajout du fichier');
    }
  }, [showNotification]);

  // Fonction pour supprimer un fichier
  const removeFile = useCallback(async (type, id) => {
    try {
      if (type === 'attachment') {
        setAttachments(prev => prev.filter(file => file.id !== id));
        showNotification('info', 'Fichier retiré de la liste des pièces à joindre');
      } else if (type === 'conclusion') {
        setConclusions(prev => prev.filter(file => file.id !== id));
        showNotification('info', 'Fichier retiré de la liste des conclusions');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error);
      showNotification('error', 'Erreur lors de la suppression du fichier');
    }
  }, [showNotification]);

  // Fonction pour générer un résultat
  const generateResult = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, result: true }));
    try {
      // Appel au webhook pour générer le document
      const generatedResult = await webhookService.triggerGenerate();
      setResult(generatedResult);
      setLastSync(prev => ({ ...prev, result: new Date() }));
      showNotification('success', 'Document généré avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération du document:', error);
      showNotification('error', 'Erreur lors de la génération du document');
    } finally {
      setIsLoading(prev => ({ ...prev, result: false }));
    }
  }, [showNotification]);

  // Valeur du contexte
  const contextValue = {
    attachments,
    conclusions,
    result,
    isLoading,
    lastSync,
    fetchAttachments,
    fetchConclusions,
    fetchResults,
    addFile,
    removeFile,
    generateResult
  };

  return (
    <FileContext.Provider value={contextValue}>
      {children}
    </FileContext.Provider>
  );
};