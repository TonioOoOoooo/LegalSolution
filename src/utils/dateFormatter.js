/**
 * Formate une date en chaîne de caractères selon le format français
 * @param {Date|string|null} date - La date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} - La date formatée
 */
export const formatDate = (date, options = {}) => {
  // Si la date est null ou undefined, retourner une valeur par défaut
  if (!date) return options.defaultValue || 'Jamais';
  
  // Si la date est déjà une chaîne, la retourner telle quelle
  if (typeof date === 'string') return date;
  
  // Options par défaut
  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  // Fusionner les options par défaut avec les options fournies
  const formatOptions = { ...defaultOptions, ...options };
  
  // Formater la date
  return new Intl.DateTimeFormat('fr-FR', formatOptions).format(date);
};

/**
 * Formate une date en format relatif (il y a X minutes, heures, etc.)
 * @param {Date|string} date - La date à formater
 * @returns {string} - La date formatée en format relatif
 */
export const formatRelativeDate = (date) => {
  if (!date) return 'Jamais';
  
  // Convertir la chaîne en objet Date si nécessaire
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Calculer la différence en secondes
  const seconds = Math.floor((new Date() - dateObj) / 1000);
  
  // Intervalles en secondes pour différentes unités de temps
  const intervals = [
    { label: 'an', seconds: 31536000 },
    { label: 'mois', seconds: 2592000 },
    { label: 'jour', seconds: 86400 },
    { label: 'heure', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'seconde', seconds: 1 }
  ];
  
  // Trouver l'intervalle approprié
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      // Gérer le pluriel
      const plural = count > 1 && interval.label !== 'mois' ? 's' : '';
      return `il y a ${count} ${interval.label}${plural}`;
    }
  }
  
  return 'à l\'instant';
};

/**
 * Convertit une chaîne de date au format français en objet Date
 * @param {string} dateString - La chaîne de date au format JJ/MM/AAAA
 * @returns {Date} - L'objet Date correspondant
 */
export const parseFrenchDate = (dateString) => {
  if (!dateString) return null;
  
  // Extraire les parties de la date (JJ/MM/AAAA)
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  // Créer la date (attention: les mois sont indexés à partir de 0)
  return new Date(parts[2], parts[1] - 1, parts[0]);
};