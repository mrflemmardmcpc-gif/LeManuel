import React, { useState } from "react";
import EditorPanel from "../components/EditorPanel";

function FullEditorPage({ open, onClose, ...editorProps }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(20,22,34,0.45)",
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
        minWidth: 900,
        maxWidth: 1200,
        maxHeight: "calc(100vh - 48px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "row",
        border: `2px solid #444`,
        position: "relative",
        overflow: "auto"
      }}>
        {/* Barre latérale outils texte (optionnelle, personnalisable) */}
        <div style={{ minWidth: 80, maxWidth: 120, background: "#181622", borderTopLeftRadius: 18, borderBottomLeftRadius: 18, padding: 18, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
          {/* Outils texte (à personnaliser si besoin) */}
        </div>
        {/* Zone principale éditeur */}
        <div style={{ flex: 1, padding: 0, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <EditorPanel {...editorProps} />
        </div>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 24, background: "#35324a", color: "#eee", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 600, cursor: "pointer", zIndex: 10000 }}>✖</button>
      </div>
    </div>
  );
}

export default FullEditorPage;
