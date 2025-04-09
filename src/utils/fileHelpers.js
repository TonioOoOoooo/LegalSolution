/**
 * Obtient l'extension d'un fichier à partir de son nom
 * @param {string} filename - Le nom du fichier
 * @returns {string} - L'extension du fichier (sans le point)
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
};

/**
 * Vérifie si un fichier est d'un type autorisé
 * @param {string} filename - Le nom du fichier
 * @param {Array<string>} allowedTypes - Les types de fichiers autorisés
 * @returns {boolean} - true si le type est autorisé, false sinon
 */
export const isAllowedFileType = (filename, allowedTypes = []) => {
  if (!filename || !allowedTypes.length) return false;
  const extension = getFileExtension(filename);
  return allowedTypes.includes(extension);
};

/**
 * Convertit la taille d'un fichier en format lisible
 * @param {number} bytes - La taille en octets
 * @param {number} decimals - Le nombre de décimales à afficher
 * @returns {string} - La taille formatée (ex: 1.5 MB)
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Génère une icône en fonction du type de fichier
 * @param {string} filename - Le nom du fichier
 * @returns {string} - Le nom de l'icône correspondante
 */
export const getFileIcon = (filename) => {
  if (!filename) return 'document';
  
  const extension = getFileExtension(filename);
  
  // Mapper les extensions aux icônes
  const iconMap = {
    pdf: 'file-pdf',
    doc: 'file-word',
    docx: 'file-word',
    xls: 'file-excel',
    xlsx: 'file-excel',
    ppt: 'file-powerpoint',
    pptx: 'file-powerpoint',
    jpg: 'file-image',
    jpeg: 'file-image',
    png: 'file-image',
    gif: 'file-image',
    zip: 'file-archive',
    rar: 'file-archive',
    txt: 'file-text'
  };
  
  return iconMap[extension] || 'file';
};

/**
 * Initialise le téléchargement d'un fichier
 * @param {Blob} blob - Le contenu du fichier
 * @param {string} filename - Le nom du fichier
 */
export const downloadFile = (blob, filename) => {
  // Créer une URL pour le blob
  const url = window.URL.createObjectURL(blob);
  
  // Créer un élément a pour déclencher le téléchargement
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  
  // Ajouter l'élément au document, cliquer dessus, puis le supprimer
  document.body.appendChild(a);
  a.click();
  
  // Nettoyer
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};