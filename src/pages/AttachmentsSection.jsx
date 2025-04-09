import React from 'react';
import { FileCheck, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import FileList from '../components/files/FileList';
import Button from '../components/ui/Button';
import { useFiles } from '../hooks/useFiles';

const AttachmentsSection = () => {
  const { 
    attachments, 
    isLoading, 
    lastSync, 
    fetchAttachments, 
    addFile, 
    removeFile 
  } = useFiles();

  const handleAddFile = () => {
    addFile('attachment');
  };

  return (
    <Card 
      title="Fichiers à joindre au dossier"
      icon={<FileCheck />}
      iconBgColor="bg-green-100"
      iconColor="text-green-600"
      onRefresh={fetchAttachments}
      isLoading={isLoading.attachments}
      lastSync={lastSync.attachments}
    >
      <FileList 
        files={attachments}
        onRemoveFile={(id) => removeFile('attachment', id)}
        isLoading={isLoading.attachments}
        emptyMessage="Aucun fichier à joindre"
      />
      
      <div className="mt-4 flex justify-center">
        <Button 
          color="green"
          icon={<Plus className="h-5 w-5" />}
          onClick={handleAddFile}
        >
          Ajouter un fichier
        </Button>
      </div>
    </Card>
  );
};

export default AttachmentsSection;