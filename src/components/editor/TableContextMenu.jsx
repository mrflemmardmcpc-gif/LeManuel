import React from "react";

export default function TableContextMenu({
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
