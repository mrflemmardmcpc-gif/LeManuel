import React, { useState } from "react";
import EditorPanel from "../components/EditorPanel";

function FullEditorModal({ open, onClose, ...editorProps }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "transparent", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#23202d", borderRadius: 18, padding: 0, minWidth: 900, maxWidth: 1200, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", display: "flex", flexDirection: "row", border: `2px solid #444` }}>
        {/* Barre latérale outils texte */}
        <div style={{ minWidth: 80, maxWidth: 120, background: "transparent", borderTopLeftRadius: 18, borderBottomLeftRadius: 18, padding: 18, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
          {/* Les outils d'édition texte seront affichés ici via EditorPanel */}
          {/* On peut extraire la barre d'outils de EditorPanel si besoin */}
        </div>
        {/* Zone principale éditeur */}
        <div style={{ flex: 1, padding: 0, minWidth: 0, display: "flex", flexDirection: "column", overflowY: 'auto', paddingRight: 18 }}>
          <EditorPanel {...editorProps} />
        </div>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 24, background: "#35324a", color: "#eee", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 600, cursor: "pointer", zIndex: 10000 }}>✖</button>
      </div>
    </div>
  );
}

export default FullEditorModal;
