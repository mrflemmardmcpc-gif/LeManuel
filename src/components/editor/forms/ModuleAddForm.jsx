import React from "react";
import { TextInput, ColorInput, PanelTitle } from "../shared/FormInputs";
import { ActionButton } from "../shared";

export default function ModuleAddForm({
  newSubTitle,
  setNewSubTitle,
  newSubColor,
  setNewSubColor,
  saveNewSub,
  cancelAddingSub,
  theme
}) {
  return (
    <div style={{
      margin: "40px auto 0 auto",
      background: theme?.panel || "#23202d",
      borderRadius: 16,
      padding: "32px 24px",
      border: `1.5px dashed ${theme?.accent1 || '#10b981'}`,
      boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
      maxWidth: 700,
    }}>
      <PanelTitle color={theme?.accent1 || "#10b981"}>➕ Ajouter un module</PanelTitle>
      <TextInput
        placeholder="Titre"
        value={newSubTitle}
        onChange={e => setNewSubTitle(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <ColorInput
        value={newSubColor}
        onChange={e => setNewSubColor(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <ActionButton onClick={saveNewSub} color="#10b981" style={{ flex: 1 }}>✅ Ajouter</ActionButton>
        <ActionButton onClick={cancelAddingSub} color="#6b7280" style={{ flex: 1 }}>Annuler</ActionButton>
      </div>
    </div>
  );
}
