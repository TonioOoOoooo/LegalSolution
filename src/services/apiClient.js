// Client API générique pour les appels HTTP

// Configuration de base
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '/api', // URL de base de l'API
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 secondes
};

export default apiClient;

// Fonction pour gérer les timeouts
const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`La requête a dépassé le délai d'attente de ${ms}ms`));
    }, ms);
  });
};

// Client API
const apiClient = {
  // Méthode GET
  get: async (endpoint, options = {}) => {
    try {
      const { headers = {}, params = {}, timeout = API_CONFIG.timeout } = options;
      
      // Construire l'URL avec les paramètres
      const url = new URL(`${API_CONFIG.baseUrl}/${endpoint}`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      // Effectuer la requête avec un timeout
      const fetchPromise = fetch(url.toString(), {
        method: 'GET',
        headers: { ...API_CONFIG.defaultHeaders, ...headers }
      });
      
      const response = await Promise.race([
        fetchPromise,
        timeoutPromise(timeout)
      ]);
      
      // Vérifier la réponse
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Traiter la réponse selon le type de contenu
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erreur lors de la requête GET:', error);
      throw error;
    }
  },
  
  // Méthode POST
  post: async (endpoint, data = {}, options = {}) => {
    try {
      const { headers = {}, timeout = API_CONFIG.timeout } = options;
      
      // Effectuer la requête avec un timeout
      const fetchPromise = fetch(`${API_CONFIG.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: { ...API_CONFIG.defaultHeaders, ...headers },
        body: JSON.stringify(data)
      });
      
      const response = await Promise.race([
        fetchPromise,
        timeoutPromise(timeout)
      ]);
      
      // Vérifier la réponse
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Traiter la réponse selon le type de contenu
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      throw error;
    }
  },
  
  // Méthode DELETE
  delete: async (endpoint, options = {}) => {
    try {
      const { headers = {}, timeout = API_CONFIG.timeout } = options;
      
      // Effectuer la requête avec un timeout
      const fetchPromise = fetch(`${API_CONFIG.baseUrl}/${endpoint}`, {
        method: 'DELETE',
        headers: { ...API_CONFIG.defaultHeaders, ...headers }
      });
      
      const response = await Promise.race([
        fetchPromise,
        timeoutPromise(timeout)
      ]);
      
      // Vérifier la réponse
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Traiter la réponse selon le type de contenu
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erreur lors de la requête DELETE:', error);
      throw error;
    }
  },
  
  // Méthode PUT
  put: async (endpoint, data = {}, options = {}) => {
    try {
      const { headers = {}, timeout = API_CONFIG.timeout } = options;
      
      // Effectuer la requête avec un timeout
      const fetchPromise = fetch(`${API_CONFIG.baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: { ...API_CONFIG.defaultHeaders, ...headers },
        body: JSON.stringify(data)
      });
      
      const response = await Promise.race([
        fetchPromise,
        timeoutPromise(timeout)
      ]);
      
      // Vérifier la réponse
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Traiter la réponse selon le type de contenu
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erreur lors de la requête PUT:', error);
      throw error;
    }
  },
  
  // Méthode pour télécharger un fichier
  downloadFile: async (endpoint, options = {}) => {
    try {
      const { headers = {}, timeout = API_CONFIG.timeout } = options;
      
      // Effectuer la requête avec un timeout
      const fetchPromise = fetch(`${API_CONFIG.baseUrl}/${endpoint}`, {
        method: 'GET',
        headers: { ...headers } // Sans Content-Type: application/json pour le téléchargement
      });
      
      const response = await Promise.race([
        fetchPromise,
        timeoutPromise(timeout)
      ]);
      
      // Vérifier la réponse
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Récupérer le blob pour le téléchargement
      const blob = await response.blob();
      
      // Extraire le nom du fichier de l'en-tête Content-Disposition
      let filename = 'fichier_téléchargé';
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      
      return { blob, filename };
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      throw error;
    }
  }
};