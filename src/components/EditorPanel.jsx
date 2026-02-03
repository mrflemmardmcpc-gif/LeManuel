
// Composant centralisé, délègue tout aux sous-composants atomiques
export default function EditorPanel(props) {
  const { editMode, isAuthenticated, editingSubId, addingSubToCatId, theme } = props;
  // Ajout d'une fonction utilitaire pour normaliser les sauts de ligne
  function normalizeLineBreaks(str) {
    if (typeof str !== 'string') return str;
    // Remplace les retours Windows/Mac par des \n
    return str.replace(/\r\n|\r/g, '\n');
  }
  if (!editMode || !isAuthenticated) return null;
  return (
      <div className="editor-panel-mobile" style={{
      background: theme?.bg || "#f8fafc",
      border: `2px solid ${theme?.accent1 || "#f59e42"}`,
      borderRadius: 18,
      padding: 32,
      marginBottom: 0,
      boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
      maxWidth: 1400,
      width: 'auto',
      marginLeft: 60,
      marginRight: 'auto',
      position: "relative",
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }}>
      <h2 style={{ color: theme?.accent1 || "#f59e42", margin: 0, fontWeight: 800, fontSize: 24, letterSpacing: 0.2 }}>Mode édition centralisé</h2>
      {/* Bloc de déplacement de sous-catégorie */}
      {editingSubId && (
        <div style={{
          margin: "32px 0 0 0",
          background: theme?.panel || "#fff",
          borderRadius: 16,
          padding: "32px 24px 24px 24px",
          border: `1.5px solid ${theme?.border || "#f59e42"}`,
          boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
          minWidth: 320,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 26, color: theme?.accent1 || "#f59e42", fontWeight: 700, marginRight: 6 }}>⇄</span>
            <span style={{ color: theme?.accent1 || "#f59e42", fontWeight: 700, fontSize: 20 }}>Déplacer ce module dans une autre catégorie</span>
          </div>
          <style>{`
            select {
              background: linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%) !important;
              color: #fff !important;
              box-shadow: 0 2px 8px 0 rgba(80,60,120,0.10);
            }
            select option {
              background: rgba(40,34,60,0.98) !important;
              color: #fff !important;
            }
            select:focus {
              outline: 2px solid ${theme?.accent1 || '#f59e42'} !important;
            }
          `}</style>
          <select
            value={props.categories.find(cat => cat.subs.some(sub => sub.id === editingSubId))?.id || ''}
            onChange={e => props.moveSubToCategory(editingSubId, Number(e.target.value))}
            style={{
              fontSize: 18,
              padding: '12px 18px',
              borderRadius: 10,
              border: `1.5px solid ${theme?.border || "#f59e42"}`,
              background: 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px 0 rgba(80,60,120,0.10)',
              marginBottom: 10
            }}
          >
            <option value="">Choisir une catégorie...</option>
            {props.categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
      )}
        {editingSubId && <ModuleEditForm {...props} saveEditSub={props.saveEditSub} normalizeLineBreaks={normalizeLineBreaks} />}
      {addingSubToCatId && <ModuleAddForm {...props} />}
    </div>
  );
}

import React from "react";
import { CategoryForm, ModuleEditForm, ModuleAddForm } from "./editor/forms";
