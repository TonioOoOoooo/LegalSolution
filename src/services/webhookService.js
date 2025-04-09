// Ce service gère les appels aux webhooks Make.com

// Configuration des webhooks
const WEBHOOK_URLS = {
  attachments: 'https://hook.eu2.make.com/521nakg1w1ylz06pr5ax658cx2xya7xj',
  conclusions: 'https://hook.eu2.make.com/s7ojtbn953x1qttho386yvhclkegsih7',
  generate: 'https://hook.eu2.make.com/gz3xwircg233xmcix65g7c3af969ayvq'
};

const webhookService = {
  // Déclencher le webhook pour ajouter un fichier à joindre
  triggerAttachmentAdd: async (fileData) => {
    try {
      // Appel au webhook avec fetch
      const response = await fetch(WEBHOOK_URLS.attachments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'add',
          file: fileData
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'appel au webhook:', error);
      throw error;
    }
  },
  
  // Déclencher le webhook pour supprimer un fichier à joindre
  triggerAttachmentRemove: async (fileId) => {
    try {
      // Appel au webhook avec fetch
      const response = await fetch(WEBHOOK_URLS.attachments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'remove',
          fileId
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'appel au webhook:', error);
      throw error;
    }
  },
  
  // Déclencher le webhook pour ajouter un fichier de conclusion
  triggerConclusionAdd: async (fileData) => {
    try {
      // Appel au webhook avec fetch
      const response = await fetch(WEBHOOK_URLS.conclusions, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'add',
          file: fileData
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'appel au webhook:', error);
      throw error;
    }
  },
  
  // Déclencher le webhook pour supprimer un fichier de conclusion
  triggerConclusionRemove: async (fileId) => {
    try {
      // Appel au webhook avec fetch
      const response = await fetch(WEBHOOK_URLS.conclusions, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'remove',
          fileId
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'appel au webhook:', error);
      throw error;
    }
  },
  
  // Déclencher le webhook pour générer un document
  triggerGenerate: async () => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Dans une implémentation réelle, on ferait un appel au webhook Generate
      // et on récupérerait les informations du fichier généré
      return {
        id: 'gen' + Math.floor(Math.random() * 90000) + 10000,
        name: `CONCLUSION${Math.floor(Math.random() * 90000) + 10000}.DOCX`,
        status: 'generated',
        date: new Date().toLocaleDateString('fr-FR')
      };
    } catch (error) {
      console.error('Erreur lors de l\'appel au webhook:', error);
      throw error;
    }
  }
};

export default webhookService;