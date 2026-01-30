import React from "react";

export default function TableHandleButtons({
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
