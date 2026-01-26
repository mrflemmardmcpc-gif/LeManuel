import React from "react";

function LoginModal({ open, onClose, onLogin, adminPassword, setAdminPassword, loginError, darkMode, theme }) {
  if (!open) return null;
  return (
    <>
      <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 600 }} onClick={onClose} />
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 700 }}>
        <div style={{ width: 360, backgroundColor: darkMode ? "rgba(15,17,30,0.95)" : "rgba(255,255,255,0.98)", border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24, boxShadow: theme.shadow, display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ margin: 0, color: theme.accent1 }}>Accès Admin</h3>
          <p style={{ margin: 0, color: theme.subtext, fontSize: 13 }}>Saisis le mot de passe pour activer l'édition.</p>
          <input type="password" value={adminPassword} onChange={e => { setAdminPassword(e.target.value); }} onKeyDown={e => { if (e.key === "Enter") onLogin(); }} style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.input, color: theme.text }} placeholder="Mot de passe" />
          {loginError && <div style={{ color: "#ef4444", fontSize: 12 }}>{loginError}</div>}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={onClose} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer" }}>Annuler</button>
            <button onClick={onLogin} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Valider</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
