import React from "react";

function ConfirmModal({ open, onClose, onConfirm, message, darkMode, theme }) {
  if (!open) return null;
  return (
    <>
      <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.65)", zIndex: 750 }} onClick={onClose} />
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 800 }}>
        <div style={{ width: 360, backgroundColor: darkMode ? "rgba(15,17,30,0.96)" : "rgba(255,255,255,0.98)", border: `1px solid ${theme.border}`, borderRadius: 12, padding: 20, boxShadow: theme.shadow, display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ margin: 0, color: theme.accent1 }}>Confirmation</h3>
          <div style={{ color: theme.text }}>{message}</div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onClose} style={{ padding: "10px 16px", borderRadius: 10, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer" }}>Retour</button>
            <button onClick={onConfirm} style={{ padding: "10px 16px", borderRadius: 10, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Continuer</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
