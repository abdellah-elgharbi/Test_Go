
export const exportToCSV = (data: any[], filename: string) => {
  // Vérifie s'il y a des données à exporter
  if (!data || !data.length) {
    console.error("Aucune donnée à exporter");
    return;
  }

  // Extrait les en-têtes de colonne à partir des clés du premier objet
  const headers = Object.keys(data[0]);
  
  // Crée les lignes CSV à partir des données
  const csvRows = [];
  
  // Ajoute l'en-tête avec les noms des colonnes
  csvRows.push(headers.join(','));
  
  // Convertit chaque objet en ligne CSV
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return `"${value}"`;
    });
    csvRows.push(values.join(','));
  }
  
  // Combine toutes les lignes en une seule chaîne CSV
  const csvString = csvRows.join('\n');
  
  // Crée un objet Blob avec les données CSV
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Crée un lien pour télécharger le fichier
  const link = document.createElement('a');
  
  // Crée une URL pour le Blob
  const url = URL.createObjectURL(blob);
  
  // Configure le lien pour le téléchargement
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  // Ajoute le lien au DOM
  document.body.appendChild(link);
  
  // Déclenche le téléchargement
  link.click();
  
  // Nettoie le lien après le téléchargement
  document.body.removeChild(link);
};
