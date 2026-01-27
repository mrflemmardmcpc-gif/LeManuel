import React from "react";

// Ce composant centralisera tout le mode édition (catégorie, module, formattage, etc.)
// Les props attendues sont à ajuster selon les besoins réels
export default function EditorPanel({
  editMode,
  setEditMode,
  isAuthenticated,
  data,
  setData,
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
  theme,
  // Pour édition de module
  editingSubId,
  editTitle,
  setEditTitle,
  editText,
  setEditText,
  editColor,
  setEditColor,
  saveEditSub,
  cancelEdit,
  selectionInfo,
  setSelectionInfo,
  applyFormatting,
  applyColorToSelection,
  tableMenuOpen,
  setTableMenuOpen,
  tableTemplates,
  quickColors,
  selectionCustomColor,
  setSelectionCustomColor,
  darkMode,
  // Pour ajout de module (props manquantes)
  addingSubToCatId,
  newSubTitle,
  setNewSubTitle,
  newSubText,
  setNewSubText,
  newSubColor,
  setNewSubColor,
  saveNewSub,
  cancelAddingSub,
  handleTextSelect,
  insertTableTemplate
}) {
  if (!editMode || !isAuthenticated) return null;
  return (
    <div style={{
      background: theme?.bg || '#f8fafc',
      border: `2px solid ${theme?.accent1 || '#f59e42'}`,
      borderRadius: 18,
      padding: 32,
      marginBottom: 32,
      boxShadow: theme?.shadow || '0 8px 32px rgba(0,0,0,0.08)',
      maxWidth: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
    }}>
      <h2 style={{ color: theme?.accent1 || '#f59e42', margin: 0, fontWeight: 800, fontSize: 24, letterSpacing: 0.2 }}>Mode édition centralisé</h2>
      <div style={{
        margin: '32px 0 0 0',
        background: theme?.panel || '#fff',
        borderRadius: 16,
        padding: '32px 24px 24px 24px',
        border: `1.5px solid ${theme?.border || '#f59e42'}`,
        boxShadow: theme?.shadow || '0 8px 32px rgba(0,0,0,0.08)',
        minWidth: 320,
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 26, color: theme?.accent1 || '#f59e42', fontWeight: 700, marginRight: 6 }}>➕</span>
          <h3 style={{ margin: 0, color: theme?.accent1 || '#f59e42', fontSize: 20, fontWeight: 700, letterSpacing: 0.1 }}>Ajouter une catégorie</h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2.2fr 1.1fr 1.1fr 2.5fr',
          gap: 18,
          alignItems: 'end',
          marginTop: 8,
          marginBottom: 0,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || '#888', fontWeight: 600 }}>Nom</label>
            <input value={newCatTitle} onChange={e => setNewCatTitle(e.target.value)} placeholder="Nom de la catégorie" style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${theme?.border || '#f59e42'}`, background: theme?.input || '#23202d', color: theme?.text || '#fff', fontSize: 16, fontWeight: 500, outline: 'none', transition: 'border 0.2s' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || '#888', fontWeight: 600 }}>Emoji</label>
            <input value={newCatEmoji} onChange={e => setNewCatEmoji(e.target.value)} placeholder="Emoji" style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${theme?.border || '#f59e42'}`, background: theme?.input || '#23202d', color: theme?.text || '#fff', fontSize: 16, fontWeight: 500, outline: 'none', transition: 'border 0.2s' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || '#888', fontWeight: 600 }}>Couleur</label>
            <input type="color" value={newCatColor} onChange={e => setNewCatColor(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 10, border: `1.5px solid ${theme?.border || '#f59e42'}`, background: 'transparent', cursor: 'pointer', padding: 0 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || '#888', fontWeight: 600 }}>Grande partie</label>
            <select value={newCatSection || ''} onChange={e => setNewCatSection(Number(e.target.value))} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${theme?.border || '#f59e42'}`, background: theme?.input || '#23202d', color: theme?.text || '#fff', fontSize: 16, fontWeight: 500, outline: 'none', transition: 'border 0.2s' }}>
              <option value="">Choisir...</option>
              {sections.map(section => (
                <option key={section.id} value={section.id}>{section.emoji} {section.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={addCategory} style={{ marginTop: 10, padding: '14px 32px', borderRadius: 10, background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', color: 'white', border: 'none', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px rgba(16,185,129,0.13)', letterSpacing: 0.1, cursor: 'pointer', transition: 'background 0.2s' }}>✅ Créer la catégorie</button>
      </div>
      {/* Edition d'un module (sous-catégorie) */}
      {editingSubId && (
        <div style={{
          margin: '40px auto 0 auto',
          background: theme?.panel || '#23202d',
          borderRadius: 16,
          padding: '32px 24px',
          border: `1.5px solid ${theme?.accent1 || '#f59e42'}`,
          boxShadow: theme?.shadow || '0 8px 32px rgba(0,0,0,0.08)',
          maxWidth: 700,
        }}>
          <h3 style={{ color: theme?.accent1 || '#f59e42', fontWeight: 700, fontSize: 20, marginBottom: 18 }}>✏️ Modifier un module</h3>
          <input placeholder="Titre" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1.5px solid ${theme?.border || '#f59e42'}`, background: theme?.input || '#23202d', color: theme?.text || '#fff', fontSize: 16, marginBottom: 12 }} />
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onSelect={(e) => setSelectionInfo({
              text: e.target.value.substring(e.target.selectionStart, e.target.selectionEnd),
              start: e.target.selectionStart,
              end: e.target.selectionEnd,
              target: "editSub"
            })}
            placeholder="Saisis ou colle ton texte (markdown)"
            style={{
              width: "100%",
              minHeight: 180,
              padding: 16,
              borderRadius: 12,
              border: `1.5px solid ${theme?.accent1 || '#f59e42'}`,
              background: darkMode ? "linear-gradient(135deg, rgba(26,32,44,0.92), rgba(17,24,39,0.92))" : "linear-gradient(135deg, #f8fafc, #eef2ff)",
              color: theme?.text || '#fff',
              fontFamily: "'Inter', 'SFMono-Regular', monospace",
              lineHeight: 1.6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              marginBottom: 12,
              borderColor: darkMode ? "rgba(255,179,102,0.45)" : "rgba(255,179,102,0.65)",
              fontSize: 15
            }}
          />
          {/* Outils de formattage */}
          {selectionInfo.text && selectionInfo.target === "editSub" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: theme?.subtext }}>{`"${selectionInfo.text}"`}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => applyFormatting("bold")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, fontWeight: 800, cursor: "pointer", fontSize: 12 }}>G</button>
                <button onClick={() => applyFormatting("italic")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, fontStyle: "italic", cursor: "pointer", fontSize: 12 }}>I</button>
                <button onClick={() => applyFormatting("underline")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, textDecoration: "underline", cursor: "pointer", fontSize: 12 }}>U</button>
                {[14, 16, 18, 20].map((s) => (
                  <button key={s} onClick={() => applyFormatting("size", s)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", fontSize: 12 }}>{s}px</button>
                ))}
                <div style={{ position: "relative" }}>
                  <button onClick={() => setTableMenuOpen(tableMenuOpen === "editSub" ? null : "editSub")}
                    style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    📊
                    <span style={{ fontWeight: 700 }}>Table</span>
                  </button>
                  {tableMenuOpen === "editSub" && (
                    <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, borderRadius: 10, boxShadow: theme?.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
                      {tableTemplates.map((tpl) => (
                        <button key={tpl.key} onClick={() => insertTableTemplate("editSub", tpl.text)} style={{ width: "100%", textAlign: "left", padding: 8, borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", marginBottom: 6, fontSize: 12 }}>
                          <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {quickColors.map((c) => (
                <button key={c} onClick={() => applyColorToSelection(c)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme?.border}`, backgroundColor: c, cursor: "pointer" }} />
              ))}
              <input type="color" value={selectionCustomColor} onChange={(e) => setSelectionCustomColor(e.target.value)} style={{ width: 32, height: 32, padding: 2, borderRadius: 8, border: `1px solid ${theme?.border}`, cursor: "pointer" }} />
              <button onClick={() => applyColorToSelection(selectionCustomColor)} style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>OK</button>
              <button onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }} style={{ padding: "6px 8px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>✖</button>
            </div>
          )}
          <input type="color" value={editColor} onChange={(e) => setEditColor(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: `1.5px solid ${theme?.border || '#f59e42'}`, cursor: "pointer", marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button onClick={saveEditSub} style={{ flex: 1, padding: "12px 0", borderRadius: 10, backgroundColor: "#10b981", color: "white", border: "none", fontWeight: 700, fontSize: 16 }}>💾 Enregistrer</button>
            <button onClick={cancelEdit} style={{ flex: 1, padding: "12px 0", borderRadius: 10, backgroundColor: "#ef4444", color: "white", border: "none", fontWeight: 700, fontSize: 16 }}>Annuler</button>
          </div>
        </div>
      )}
      {/* Ajout d'un module (sous-catégorie) */}
      {addingSubToCatId && (
        <div style={{
          margin: '40px auto 0 auto',
          background: theme?.panel || '#23202d',
          borderRadius: 16,
          padding: '32px 24px',
          border: `1.5px dashed ${theme?.accent1 || '#10b981'}`,
          boxShadow: theme?.shadow || '0 8px 32px rgba(0,0,0,0.08)',
          maxWidth: 700,
        }}>
          <h3 style={{ color: theme?.accent1 || '#10b981', fontWeight: 700, fontSize: 20, marginBottom: 18 }}>➕ Ajouter un module</h3>
          <input placeholder="Titre" value={newSubTitle} onChange={(e) => setNewSubTitle(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1.5px solid ${theme?.border || '#10b981'}`, background: theme?.input || '#23202d', color: theme?.text || '#fff', fontSize: 16, marginBottom: 12 }} />
          <textarea
            value={newSubText}
            onChange={(e) => setNewSubText(e.target.value)}
            onSelect={(e) => handleTextSelect(e, "newSub")}
            placeholder="Saisis ou colle ton texte (markdown)"
            style={{
              width: "100%",
              minHeight: 160,
              padding: 16,
              borderRadius: 12,
              border: `1.5px solid ${theme?.accent1 || '#10b981'}`,
              background: darkMode ? "linear-gradient(135deg, rgba(26,32,44,0.92), rgba(17,24,39,0.92))" : "linear-gradient(135deg, #f8fafc, #eef2ff)",
              color: theme?.text || '#fff',
              fontFamily: "'Inter', 'SFMono-Regular', monospace",
              lineHeight: 1.6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              marginBottom: 12,
              borderColor: darkMode ? "rgba(16,185,129,0.45)" : "rgba(16,185,129,0.65)",
              fontSize: 15
            }}
          />
          {/* Outils de formattage */}
          {selectionInfo.text && selectionInfo.target === "newSub" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: theme?.subtext }}>{`"${selectionInfo.text}"`}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => applyFormatting("bold")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, fontWeight: 800, cursor: "pointer", fontSize: 12 }}>G</button>
                <button onClick={() => applyFormatting("italic")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, fontStyle: "italic", cursor: "pointer", fontSize: 12 }}>I</button>
                <button onClick={() => applyFormatting("underline")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, textDecoration: "underline", cursor: "pointer", fontSize: 12 }}>U</button>
                {[14, 16, 18, 20].map((s) => (
                  <button key={s} onClick={() => applyFormatting("size", s)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", fontSize: 12 }}>{s}px</button>
                ))}
                <div style={{ position: "relative" }}>
                  <button onClick={() => setTableMenuOpen(tableMenuOpen === "newSub" ? null : "newSub")}
                    style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    📊
                    <span style={{ fontWeight: 700 }}>Table</span>
                  </button>
                  {tableMenuOpen === "newSub" && (
                    <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, borderRadius: 10, boxShadow: theme?.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
                      {tableTemplates.map((tpl) => (
                        <button key={tpl.key} onClick={() => insertTableTemplate("newSub", tpl.text)} style={{ width: "100%", textAlign: "left", padding: 8, borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", marginBottom: 6, fontSize: 12 }}>
                          <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {quickColors.map((c) => (
                <button key={c} onClick={() => applyColorToSelection(c)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme?.border}`, backgroundColor: c, cursor: "pointer" }} />
              ))}
              <input type="color" value={selectionCustomColor} onChange={(e) => setSelectionCustomColor(e.target.value)} style={{ width: 32, height: 32, padding: 2, borderRadius: 8, border: `1px solid ${theme?.border}`, cursor: "pointer" }} />
              <button onClick={() => applyColorToSelection(selectionCustomColor)} style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>OK</button>
              <button onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }} style={{ padding: "6px 8px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>✖</button>
            </div>
          )}
          <input type="color" value={newSubColor} onChange={(e) => setNewSubColor(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: `1.5px solid ${theme?.border || '#10b981'}`, cursor: "pointer", marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button onClick={saveNewSub} style={{ flex: 1, padding: "12px 0", borderRadius: 10, backgroundColor: "#10b981", color: "white", border: "none", fontWeight: 700, fontSize: 16 }}>✅ Ajouter</button>
            <button onClick={cancelAddingSub} style={{ flex: 1, padding: "12px 0", borderRadius: 10, backgroundColor: "#6b7280", color: "white", border: "none", fontWeight: 700, fontSize: 16 }}>Annuler</button>
          </div>
        </div>
      )}
      <button onClick={() => setEditMode(false)} style={{ marginTop: 32, padding: '12px 32px', borderRadius: 12, background: '#ef4444', color: 'white', border: 'none', fontWeight: 700, fontSize: 18, letterSpacing: 0.1, boxShadow: '0 2px 8px rgba(239,68,68,0.13)', cursor: 'pointer' }}>Quitter le mode édition</button>
    </div>
  );
}
