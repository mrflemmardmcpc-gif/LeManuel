import React from "react";

// Ce composant centralisera tout le mode édition (catégorie, module, formattage, etc.)
// Les props attendues sont à ajuster selon les besoins réels
export default function EditorPanel({
  editMode,
  setEditMode,
  isAuthenticated,
  data,
  setData,
  ...rest
}) {
  // TODO: Déplacer ici toute la logique, les états et le rendu liés à l’édition
  // (formulaires d’ajout/édition de catégorie, module, outils de formatage, etc.)
  // Pour l’instant, simple placeholder
  if (!editMode || !isAuthenticated) return null;
  return (
    <div style={{ background: '#fffbe6', border: '2px solid #f59e42', borderRadius: 16, padding: 24, marginBottom: 24 }}>
      <h2 style={{ color: '#f59e42', margin: 0 }}>Mode édition centralisé</h2>
      {/* TODO: Insérer ici les formulaires et outils d’édition */}
      <p>Déplace ici tout le code d’édition pour pouvoir le refondre facilement.</p>
      <button onClick={() => setEditMode(false)} style={{ marginTop: 16, padding: '8px 18px', borderRadius: 8, background: '#ef4444', color: 'white', border: 'none', fontWeight: 700 }}>Quitter le mode édition</button>
    </div>
  );
}
