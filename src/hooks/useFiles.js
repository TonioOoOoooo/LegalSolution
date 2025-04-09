import { useContext } from 'react';
import { FileContext } from '../context/FileContext';

export const useFiles = () => {
  const context = useContext(FileContext);
  
  if (!context) {
    throw new Error('useFiles doit être utilisé à l\'intérieur d\'un FileProvider');
  }
  
  return context;
};