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
  theme
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
      <button onClick={() => setEditMode(false)} style={{ marginTop: 32, padding: '12px 32px', borderRadius: 12, background: '#ef4444', color: 'white', border: 'none', fontWeight: 700, fontSize: 18, letterSpacing: 0.1, boxShadow: '0 2px 8px rgba(239,68,68,0.13)', cursor: 'pointer' }}>Quitter le mode édition</button>
    </div>
  );
}
