import React from 'react';
import FileItem from './FileItem';

const FileList = ({ 
  files = [], 
  onRemoveFile,
  isLoading = false,
  emptyMessage = "Aucun fichier à afficher"
}) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="flex bg-gray-50 text-gray-500 text-sm font-medium border-b">
        <div className="px-6 py-3 w-2/3">Nom</div>
        <div className="px-6 py-3 w-1/3">Actions</div>
      </div>
      
      <div className="divide-y divide-gray-200 bg-white">
        {isLoading ? (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            Chargement des fichiers...
          </div>
        ) : files.length === 0 ? (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          files.map((file) => (
            <FileItem 
              key={file.id} 
              file={file} 
              onRemove={() => onRemoveFile(file.id)} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FileList;