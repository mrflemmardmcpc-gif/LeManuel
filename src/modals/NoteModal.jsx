import React, { useState } from "react";

function NoteModal({ open, onClose, sections, categories, onSave }) {
  const [note, setNote] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,22,34,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#23202d", borderRadius: 16, padding: 20, minWidth: 280, maxWidth: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", display: "flex", flexDirection: "column", gap: 14, border: `1px solid #444` }}>
        <h2 style={{ margin: 0, fontSize: 17, color: "#10b981", fontWeight: 700 }}>📝 Nouvelle note</h2>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Votre note..." style={{ width: "100%", minHeight: 60, borderRadius: 8, border: "1px solid #444", background: "#181622", color: "#f3f3f3", padding: 8, fontSize: 14, resize: "vertical" }} />
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <select value={sectionId} onChange={e => setSectionId(e.target.value)} style={{ flex: 1, borderRadius: 8, padding: 6, background: "#181622", color: "#f3f3f3", border: "1px solid #444", maxWidth: "50%", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            <option value="">Grande partie...</option>
            {sections.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
          </select>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ flex: 1, borderRadius: 8, padding: 6, background: "#181622", color: "#f3f3f3", border: "1px solid #444", maxWidth: "50%", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            <option value="">Catégorie...</option>
            {categories.filter(c => !sectionId || c.sectionId == sectionId).map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "7px 14px", borderRadius: 8, background: "#35324a", color: "#eee", border: "none", fontWeight: 600, cursor: "pointer" }}>Annuler</button>
          <button onClick={() => onSave({ note, sectionId, categoryId })} style={{ padding: "7px 14px", borderRadius: 8, background: "#10b981", color: "white", border: "none", fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
