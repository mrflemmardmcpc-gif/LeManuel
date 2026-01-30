import React, { useState } from "react";
import EditorPanel from "../components/EditorPanel";

function FullEditorPage({ open, onClose, saveEditSub, saveEditCategory, sections, darkMode, selectionInfo, ...editorProps }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "transparent",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      <div style={{
        background: "#23202d",
        borderRadius: 18,
        padding: 0,
        minWidth: 0,
        maxWidth: 600,
        width: '100%',
        margin: '0 auto',
        maxHeight: "calc(100vh - 48px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
        border: `2px solid #444`,
        position: "relative",
        overflow: "auto"
      }}>
        {/* Barre latérale outils texte supprimée pour alignement à gauche */}
        {/* Zone principale éditeur */}
        <div style={{ flex: 1, padding: 0, minWidth: 0, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Force re-render on subId or parentCatId change to update select */}
          <EditorPanel
            key={editorProps.editingSubId ? `${editorProps.editingSubId}-${editorProps.categories?.find(cat => cat.subs?.some(sub => sub.id === editorProps.editingSubId))?.id || ''}` : 'no-edit'}
            sections={sections}
            darkMode={darkMode}
            selectionInfo={selectionInfo}
            {...editorProps}
          />
        </div>
        {/* Bouton 'Quitter le mode édition' supprimé */}
      </div>
    </div>
  );
}

export default FullEditorPage;
