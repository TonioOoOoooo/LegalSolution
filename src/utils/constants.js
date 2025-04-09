// Configuration de l'application

// OneDrive - configurations et IDs
export const ONEDRIVE = {
  DRIVE_ROOT_ID: 'b!fYpZOAOuSk-nuqGz4IY6A_KnqEZo9RNCiXlKKOmiZQugXno2aemkSrPJGPcGiJj2',
  FOLDERS: {
    ATTACHMENTS: '01LX74FIDT7S7QVP7AZNCLIH75Z7V3GWQ5',
    CONCLUSIONS: '01LX74FIDO3XB3ZJCUZZFI67ANLIQBLLF6',
    RESULTS: '01LX74FIBI3AMTNDK32FEZT2WUDV4SEL72'
  }
};

// URLs des webhooks Make
export const WEBHOOKS = {
  ATTACHMENTS: 'https://hook.eu2.make.com/521nakg1w1ylz06pr5ax658cx2xya7xj',
  CONCLUSIONS: 'https://hook.eu2.make.com/s7ojtbn953x1qttho386yvhclkegsih7',
  GENERATE: 'https://hook.eu2.make.com/gz3xwircg233xmcix65g7c3af969ayvq'
};

// Types de fichiers autorisés
export const ALLOWED_FILE_TYPES = {
  ATTACHMENTS: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  CONCLUSIONS: ['doc', 'docx'],
  RESULTS: ['doc', 'docx']
};

// Taille maximale des fichiers (en octets)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Messages d'erreur
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'Le fichier est trop volumineux. La taille maximale autorisée est de 10 MB.',
  INVALID_FILE_TYPE: 'Type de fichier non pris en charge.',
  NETWORK_ERROR: 'Erreur de connexion au serveur. Veuillez réessayer.',
  AUTHENTICATION_ERROR: 'Erreur d\'authentification. Veuillez vous reconnecter.',
  ONEDRIVE_ERROR: 'Erreur lors de l\'accès à OneDrive. Veuillez réessayer.',
  WEBHOOK_ERROR: 'Erreur lors de l\'appel à l\'automatisation. Veuillez réessayer.'
};

// Délais (en millisecondes)
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 secondes
  NOTIFICATION: 3000, // 3 secondes
  DEBOUNCE: 300 // 300 millisecondes
};

// Types de notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};