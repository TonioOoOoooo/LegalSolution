import React from 'react';
import { FileText, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import FileList from '../components/files/FileList';
import Button from '../components/ui/Button';
import { useFiles } from '../hooks/useFiles';

const ConclusionsSection = () => {
  const { 
    conclusions, 
    isLoading, 
    lastSync, 
    fetchConclusions, 
    addFile, 
    removeFile 
  } = useFiles();

  const handleAddFile = () => {
    addFile('conclusion');
  };

  return (
    <Card 
      title="Type de conclusion/mémoire"
      icon={<FileText />}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      onRefresh={fetchConclusions}
      isLoading={isLoading.conclusions}
      lastSync={lastSync.conclusions}
    >
      <FileList 
        files={conclusions}
        onRemoveFile={(id) => removeFile('conclusion', id)}
        isLoading={isLoading.conclusions}
        emptyMessage="Aucun fichier de conclusion/mémoire"
      />
      
      <div className="mt-4 flex justify-center">
        <Button 
          color="blue"
          icon={<Plus className="h-5 w-5" />}
          onClick={handleAddFile}
        >
          Ajouter un fichier
        </Button>
      </div>
    </Card>
  );
};

export default ConclusionsSection;