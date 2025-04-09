// Ce service sera implémenté avec Microsoft Graph API pour OneDrive
// Pour l'instant, nous utilisons des données simulées

// Configuration pour OneDrive (à remplacer par des variables d'environnement)
const ONEDRIVE_CONFIG = {
  driveId: 'b!fYpZOAOuSk-nuqGz4IY6A_KnqEZo9RNCiXlKKOmiZQugXno2aemkSrPJGPcGiJj2',
  folders: {
    attachments: '01LX74FIDT7S7QVP7AZNCLIH75Z7V3GWQ5',
    conclusions: '01LX74FIDO3XB3ZJCUZZFI67ANLIQBLLF6',
    results: '01LX74FIBI3AMTNDK32FEZT2WUDV4SEL72'
  }
};

// Données simulées
const MOCK_FILES = {
  attachments: [
    { id: 'att1', name: '(HYDRAECO) (EXEMP MAF) 10_03_2025 ASS REF TJ DRAGUIGNAN du MOA c_ADHT_MAF et autres en OC.PDF', status: 'uploaded' },
    { id: 'att2', name: 'Fichier 2', status: 'pending' }
  ],
  conclusions: [
    { id: 'conc1', name: 'CONCLUSIONS 08 03 2022.docx', status: 'uploaded' }
  ],
  results: [
    { id: 'res1', name: 'CONCLUSION15922.DOCX', status: 'generated', date: '03/04/2025' }
  ]
};

const oneDriveService = {
  // Récupérer les fichiers d'une catégorie depuis OneDrive
  getOneDriveFiles: async (category) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier la catégorie
    if (!['attachments', 'conclusions'].includes(category)) {
      throw new Error('Catégorie non valide');
    }
    
    // Dans une implémentation réelle, on ferait un appel API à Microsoft Graph
    // pour récupérer les fichiers du dossier spécifié
    return MOCK_FILES[category];
  },
  
  // Récupérer le fichier de résultat
  getResultFile: async () => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dans une implémentation réelle, on ferait un appel API à Microsoft Graph
    // pour récupérer le dernier fichier généré
    return MOCK_FILES.results[0];
  },
  
  // Sélectionner un fichier dans OneDrive
  selectFile: async () => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dans une implémentation réelle, on ouvrirait le sélecteur de fichier OneDrive
    // et on retournerait le fichier sélectionné
    return {
      id: 'new' + Math.floor(Math.random() * 1000),
      name: `Nouveau fichier ${Math.floor(Math.random() * 100)}.docx`,
      status: 'pending'
    };
  },
  
  // Télécharger un fichier
  downloadFile: async (fileId) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dans une implémentation réelle, on initierait le téléchargement du fichier
    console.log(`Téléchargement du fichier ${fileId}`);
    
    return true;
  }
};

export default oneDriveService;