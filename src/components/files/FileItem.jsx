import React from 'react';
import { Minus } from 'lucide-react';
import Button from '../ui/Button';

const FileItem = ({ file, onRemove }) => {
  return (
    <div className="flex items-center hover:bg-gray-50">
      <div className="px-6 py-4 w-2/3 truncate text-sm font-medium text-gray-900">
        {file.name}
      </div>
      <div className="px-6 py-4 w-1/3 text-sm text-gray-500">
        <Button 
          color="red" 
          size="sm" 
          onClick={onRemove}
          icon={<Minus className="h-4 w-4" />}
        >
          Retirer
        </Button>
      </div>
    </div>
  );
};

export default FileItem;