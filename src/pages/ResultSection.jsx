import React from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useFiles } from '../hooks/useFiles';

const ResultSection = () => {
  const { 
    result, 
    attachments,
    conclusions,
    isLoading, 
    lastSync, 
    fetchResults,
    generateResult
  } = useFiles();

  const canGenerate = attachments.length > 0 && conclusions.length > 0;

  return (
    <Card 
      title="Conclusion ou Mémoire"
      icon={<Upload />}
      iconBgColor="bg-purple-100"
      iconColor="text-purple-600"
      onRefresh={fetchResults}
      isLoading={isLoading.result}
      lastSync={lastSync.result}
    >
      <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
        <div className="flex bg-gray-50 text-gray-500 text-sm font-medium border-b">
          <div className="px-6 py-3 w-1/2">Fichier</div>
          <div className="px-6 py-3 w-1/4">Date de génération</div>
          <div className="px-6 py-3 w-1/4">Actions</div>
        </div>
        <div className="divide-y divide-gray-200 bg-white">
          {isLoading.result ? (
            <div className="px-6 py-4 text-center text-sm text-gray-500">
              Chargement du résultat...
            </div>
          ) : !result ? (
            <div className="px-6 py-4 text-center text-sm text-gray-500">
              Aucun document généré
            </div>
          ) : (
            <div className="flex items-center hover:bg-gray-50">
              <div className="px-6 py-4 w-1/4 text-sm text-gray-500">
                {result.date}
              </div>
              <div className="px-6 py-4 w-1/4 text-sm text-gray-500">
                <Button 
                  color="light" 
                  size="sm"
                >
                  Télécharger
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <Button 
          color="purple"
          icon={<ArrowRight className="h-5 w-5" />}
          onClick={generateResult}
          disabled={isLoading.result || !canGenerate}
          isLoading={isLoading.result}
        >
          {isLoading.result ? 'Génération en cours...' : 'Générer un document'}
        </Button>
      </div>
      
      {!canGenerate && (
        <div className="mt-3 text-center text-xs text-red-500">
          Veuillez ajouter au moins un fichier à joindre et un type de conclusion pour générer un document
        </div>
      )}
    </Card>
  );
};

export default ResultSection;