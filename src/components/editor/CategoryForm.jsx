import React from "react";
import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import SelectInput from "./SelectInput";
import ActionButton from "./ActionButton";
import PanelTitle from "./PanelTitle";

export default function CategoryForm({
  newCatTitle,
  setNewCatTitle,
  newCatEmoji,
  setNewCatEmoji,
  newCatColor,
  setNewCatColor,
  newCatSection,
  setNewCatSection,
  addCategory,
  sections,
  theme
}) {
  return (
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
        <span style={{ fontSize: 26, color: theme?.accent1 || "#f59e42", fontWeight: 700, marginRight: 6 }}>➕</span>
        <PanelTitle color={theme?.accent1 || "#f59e42"}>Ajouter une catégorie</PanelTitle>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2.2fr 1.1fr 1.1fr 2.5fr",
        gap: 18,
        alignItems: "end",
        marginTop: 8,
        marginBottom: 0,
      }}>
        <TextInput label="Nom" value={newCatTitle} onChange={e => setNewCatTitle(e.target.value)} placeholder="Nom de la catégorie" />
        <TextInput label="Emoji" value={newCatEmoji} onChange={e => setNewCatEmoji(e.target.value)} placeholder="Emoji" />
        <ColorInput label="Couleur" value={newCatColor} onChange={e => setNewCatColor(e.target.value)} />
        <SelectInput
          label="Grande partie"
          value={newCatSection || ""}
          onChange={e => setNewCatSection(Number(e.target.value))}
          options={[
            { value: "", label: "Choisir..." },
            ...sections.map(section => ({ value: section.id, label: `${section.emoji} ${section.name}` }))
          ]}
        />
      </div>
      <ActionButton onClick={addCategory} color="#3b82f6" style={{ marginTop: 10, padding: "14px 32px", borderRadius: 10, fontSize: 18, boxShadow: "0 2px 8px rgba(16,185,129,0.13)", letterSpacing: 0.1 }}>
        ✅ Créer la catégorie
      </ActionButton>
    </div>
  );
}
