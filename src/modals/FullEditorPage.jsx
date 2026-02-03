import React, { useState } from "react";
import EditorPanel from "../components/EditorPanel";

function FullEditorPage({ open, onClose, saveEditSub, saveEditCategory, sections, darkMode, selectionInfo, ...editorProps }) {
  if (!open) return null;
  return (
    <div className="full-editor-page-mobile" style={{
      position: "fixed",
      inset: 0,
      background: "transparent",
      zIndex: 2147483647,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      overflow: "hidden",
      pointerEvents: 'auto',
    }}>
      <div style={{
        background: "transparent",
        borderRadius: 18,
        padding: 0,
        minWidth: 0,
        maxWidth: 1400,
        width: 'auto',
        marginRight: 614,
        marginTop: 20,
        maxHeight: "calc(100vh - 48px)",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        border: 'none',
        position: "relative",
        overflow: "auto",
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE 10+ */
      }}
        /* Chrome, Edge, Safari */
        className="no-scrollbar"
      >
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 24, background: "#35324a", color: "#eee", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 600, cursor: "pointer", zIndex: 10000 }}>
          &#10006;
        </button>
        {/* Barre latérale outils texte supprimée pour alignement à gauche */}
        {/* Zone principale éditeur */}
        <div style={{ flex: 1, padding: 0, minWidth: 0, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Force re-render on subId or parentCatId change to update select */}
          <EditorPanel
            key={editorProps.editingSubId ? `${editorProps.editingSubId}-${editorProps.categories?.find(cat => cat.subs?.some(sub => sub.id === editorProps.editingSubId))?.id || ''}` : 'no-edit'}
            {...editorProps}
            saveEditSub={saveEditSub}
            saveEditCategory={saveEditCategory}
            sections={sections}
            darkMode={darkMode}
            selectionInfo={selectionInfo}
          />
        </div>
        {/* Bouton 'Quitter le mode édition' supprimé */}
      </div>
    </div>
  );
}

export default FullEditorPage;
