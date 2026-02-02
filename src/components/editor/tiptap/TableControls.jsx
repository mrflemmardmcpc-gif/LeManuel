import React from "react";

export function TableContextMenu({
  visible,
  x,
  y,
  onDeleteCell,
  onDeleteRow,
  onDeleteColumn,
  onCellToHeader,
  onColorCell,
  theme
}) {
  if (!visible) return null;
  const cellColors = ["#f59e42", "#10b981", "#3b82f6", "#e11d48", "#fbbf24", "#23202d", "#fff"];
  return (
    <div style={{ position: 'fixed', top: y, left: x, zIndex: 9999, background: theme?.panel || '#23202d', color: theme?.text || '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: 8, minWidth: 160 }}>
      <div style={{ padding: 8, cursor: 'pointer' }} onClick={onDeleteCell}>Supprimer la cellule</div>
      <div style={{ padding: 8, cursor: 'pointer' }} onClick={onDeleteRow}>Supprimer la ligne</div>
      <div style={{ padding: 8, cursor: 'pointer' }} onClick={onDeleteColumn}>Supprimer la colonne</div>
      <div style={{ padding: 8, cursor: 'pointer' }} onClick={onCellToHeader}>Transformer en titre (th)</div>
      <div style={{ padding: 8, fontWeight: 600 }}>Couleur de la cellule :</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 8px 8px 8px' }}>
        {cellColors.map(c => (
          <button key={c} onClick={() => onColorCell(c)} style={{ width: 22, height: 22, borderRadius: 5, border: '1.5px solid #888', background: c, cursor: 'pointer' }} />
        ))}
        <input type="color" onChange={e => onColorCell(e.target.value)} style={{ width: 26, height: 26, border: 'none', background: 'none', cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export function TableHandleButtons({
  show,
  coords,
  onAddColumn,
  onAddRow,
  theme,
  editorContentRef
}) {
  if (!show || !coords || !editorContentRef?.current) return null;
  const left = coords.left - editorContentRef.current.getBoundingClientRect().left + coords.width / 2 - 44;
  const top = coords.top - editorContentRef.current.getBoundingClientRect().top - 32;
  return (
    <div style={{
      position: 'absolute',
      left,
      top,
      display: 'flex',
      gap: 8,
      zIndex: 100,
      pointerEvents: 'auto',
    }}>
      <button
        onClick={onAddColumn}
        style={{
          background: theme?.panel || '#23202d',
          color: theme?.accent1 || '#f59e42',
          border: 'none',
          borderRadius: 12,
          fontSize: 13,
          opacity: 0.7,
          padding: '2px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
          minWidth: 0,
          height: 22,
          lineHeight: 1,
          fontWeight: 700,
          position: 'relative',
        }}
        title="Ajouter une colonne"
      >
        +Col
      </button>
      <button
        onClick={onAddRow}
        style={{
          background: theme?.panel || '#23202d',
          color: theme?.accent2 || '#10b981',
          border: 'none',
          borderRadius: 12,
          fontSize: 13,
          opacity: 0.7,
          padding: '2px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
          minWidth: 0,
          height: 22,
          lineHeight: 1,
          fontWeight: 700,
          position: 'relative',
        }}
        title="Ajouter une ligne"
      >
        +Ligne
      </button>
    </div>
  );
}
