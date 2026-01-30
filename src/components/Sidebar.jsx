import React from "react";

export default function Sidebar({
  show,
  onClose,
  isAuthenticated,
  showEditSectionsPanel,
  setShowEditSectionsPanel,
  newSectionName,
  setNewSectionName,
  newSectionEmoji,
  setNewSectionEmoji,
  newSectionColor,
  setNewSectionColor,
  sectionSwatches,
  addSection,
  data,
  setData,
  editingSectionId,
  setEditingSectionId,
  editSectionName,
  setEditSectionName,
  editSectionEmoji,
  setEditSectionEmoji,
  editSectionColor,
  setEditSectionColor,
  saveEditSection,
  cancelEditSection,
  startEditSection,
  deleteSection,
  selectedSectionId,
  setSelectedSectionId,
  selectedCategoryId,
  setSelectedCategoryId,
  setSearch,
  theme,
  layout,
  draggingIndex,
  setDraggingIndex,
  insertPosition,
  setInsertPosition,
}) {
  if (!show) return null;
  return (
    <>
      <div style={{ position: "fixed", inset: 0, backgroundColor: "transparent", zIndex: 200 }} onClick={onClose} />
      <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: layout.sideWidth, backgroundColor: theme.panel, backdropFilter: "blur(20px)", zIndex: 300, overflow: "auto", padding: layout.modalPad, borderRight: `1px solid ${theme.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: theme.accent1 }}>📂 Menu</h2>
          <button onClick={onClose} style={{ padding: "8px 12px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}>✖</button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0, color: theme.accent1, fontSize: 14 }}>🏗️ Grandes Parties</h3>
            {isAuthenticated && (
              <button onClick={() => setShowEditSectionsPanel(!showEditSectionsPanel)} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: showEditSectionsPanel ? "#ef4444" : "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>{showEditSectionsPanel ? "✖" : "⚙️"}</button>
            )}
          </div>

          {isAuthenticated && showEditSectionsPanel ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ backgroundColor: theme.bg, padding: 12, borderRadius: 8, border: `2px dashed #10b981` }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#10b981", fontSize: 12 }}>➕ Ajouter</h4>
                <input placeholder="Nom" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                <input placeholder="Emoji" value={newSectionEmoji} onChange={(e) => setNewSectionEmoji(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <input type="color" value={newSectionColor} onChange={(e) => setNewSectionColor(e.target.value)} style={{ width: "100%", padding: 4, borderRadius: 4, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 10 }}>
                  {sectionSwatches.map((c) => (
                    <button key={c} onClick={() => setNewSectionColor(c)} style={{ height: 28, borderRadius: 6, border: `1px solid ${theme.border}`, backgroundColor: c, cursor: "pointer" }} />
                  ))}
                </div>
                <button onClick={addSection} style={{ width: "100%", padding: "6px", borderRadius: 4, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: "bold" }}>➕ Ajouter</button>
              </div>

              {data.sections.map((section, idx) => (
                <div key={section.id}>
                  {editingSectionId === section.id ? (
                    <div style={{ backgroundColor: theme.bg, padding: 12, borderRadius: 8, border: `1px solid ${theme.accent1}` }}>
                      <input placeholder="Nom" value={editSectionName} onChange={(e) => setEditSectionName(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                      <input placeholder="Emoji" value={editSectionEmoji} onChange={(e) => setEditSectionEmoji(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <input type="color" value={editSectionColor} onChange={(e) => setEditSectionColor(e.target.value)} style={{ width: "100%", padding: 4, borderRadius: 4, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 10 }}>
                        {sectionSwatches.map((c) => (
                          <button key={c} onClick={() => setEditSectionColor(c)} style={{ height: 28, borderRadius: 6, border: `1px solid ${theme.border}`, backgroundColor: c, cursor: "pointer" }} />
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={saveEditSection} style={{ flex: 1, padding: "6px", borderRadius: 4, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>✅</button>
                        <button onClick={cancelEditSection} style={{ flex: 1, padding: "6px", borderRadius: 4, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>❌</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 8, backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }}>
                      <span style={{ fontSize: 14, fontWeight: "500" }}>{section.emoji} {section.name}</span>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button onClick={() => startEditSection(section)} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>✏️</button>
                        <button onClick={() => deleteSection(section.id)} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>🗑️</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.sections.map((section, idx) => (
                isAuthenticated ? (
                  <div key={section.id} style={{ cursor: "grab" }}>
                    {/* Drag & drop logic can be further modularized if needed */}
                    <div
                      style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: 8, backgroundColor: section.id === selectedSectionId ? section.color : theme.bg, color: section.id === selectedSectionId ? "white" : theme.text, border: `1px solid ${theme.border}`, fontWeight: 500 }}
                      onClick={() => { setSelectedSectionId(section.id); setSelectedCategoryId(null); setSearch(""); }}
                    >
                      {section.emoji} {section.name}
                    </div>
                  </div>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => { setSelectedSectionId(section.id); setSelectedCategoryId(null); setSearch(""); }}
                    style={{ flex: 1, padding: "12px 16px", borderRadius: 8, backgroundColor: selectedSectionId === section.id ? section.color : theme.bg, color: selectedSectionId === section.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: "500", display: "flex", alignItems: "center" }}
                  >
                    {section.emoji} {section.name}
                  </button>
                )
              ))}
            </div>
          )}
        </div>

        {selectedSectionId && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: 12, color: theme.accent1, fontSize: 14 }}>📋 Catégories</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.categories.filter(cat => cat.sectionId === selectedSectionId).map((cat) => (
                <button key={cat.id} onClick={() => { setSelectedCategoryId(cat.id); setSearch(""); onClose(); }} style={{ padding: "12px 16px", borderRadius: 8, backgroundColor: selectedCategoryId === cat.id ? cat.color || theme.accent1 : theme.bg, color: selectedCategoryId === cat.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", textAlign: "left", fontSize: 14 }}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
