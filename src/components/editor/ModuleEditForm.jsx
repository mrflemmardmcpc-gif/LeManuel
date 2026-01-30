import React from "react";
import TiptapEditor from "./TiptapEditor";
import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import ActionButton from "./ActionButton";
import PanelTitle from "./PanelTitle";

export default function ModuleEditForm({
  editTitle,
  setEditTitle,
  editText,
  setEditText,
  highlightColor,
  setHighlightColor,
  darkMode,
  theme,
  setEditorInstance,
  selectionInfo,
  applyFormatting,
  applyColorToSelection,
  tableMenuOpen,
  setTableMenuOpen,
  tableTemplates,
  quickColors,
  selectionCustomColor,
  setSelectionCustomColor,
  saveEditSub,
  cancelEdit,
  editColor,
  setEditColor,
  normalizeLineBreaks
}) {
  return (
    <div style={{
      margin: "40px auto 0 auto",
      background: theme?.panel || "#23202d",
      borderRadius: 16,
      padding: "32px 24px",
      border: `1.5px solid ${theme?.accent1 || "#f59e42"}`,
      boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
      maxWidth: 700,
    }}>
      <PanelTitle color={theme?.accent1 || "#f59e42"}>✏️ Modifier un module</PanelTitle>
      <TextInput
        placeholder="Titre"
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <div style={{ marginBottom: 16 }}>
        <TiptapEditor
          value={editText}
          onChange={setEditText}
          darkMode={darkMode}
          theme={theme}
          setEditorInstance={setEditorInstance}
          highlightColor={highlightColor}
          setHighlightColor={setHighlightColor}
        />
      </div>
      {/* Outils de formattage, couleurs, etc. à extraire ici si besoin */}
      {/* ...existing code for formatting tools... */}
      <ColorInput
        value={editColor}
        onChange={e => setEditColor(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <ActionButton onClick={() => { setEditText(prev => normalizeLineBreaks(prev)); saveEditSub(); }} color="#10b981" style={{ flex: 1 }}>💾 Enregistrer</ActionButton>
        <ActionButton onClick={cancelEdit} color="#ef4444" style={{ flex: 1 }}>Annuler</ActionButton>
      </div>
    </div>
  );
}
