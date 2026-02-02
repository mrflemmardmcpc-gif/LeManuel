import React from "react";

function ConfirmModal({ open, onClose, onConfirm, message, darkMode, theme }) {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }}>
      <div style={{
        backgroundColor: theme.panel,
        borderRadius: 12,
        padding: 24,
        maxWidth: 400,
        width: '90%',
        boxShadow: theme.shadow
      }}>
        <h2 style={{ margin: '0 0 16px 0', color: theme.text, fontSize: 20, fontWeight: 700 }}>Confirmation</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ color: theme.text, fontSize: 16 }}>{message}</div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button 
              onClick={onClose} 
              style={{ 
                padding: '10px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                backgroundColor: "#6b7280", 
                color: "white", 
                border: "none", 
                cursor: "pointer" 
              }}
            >
              Retour
            </button>
            <button 
              onClick={onConfirm} 
              style={{ 
                padding: '10px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                backgroundColor: "#10b981", 
                color: "white", 
                border: "none", 
                cursor: "pointer" 
              }}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
