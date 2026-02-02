import React from "react";

function LoginModal({ open, onClose, onLogin, adminPassword, setAdminPassword, loginError, darkMode, theme }) {
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
        <h2 style={{ margin: '0 0 16px 0', color: theme.text, fontSize: 20, fontWeight: 700 }}>Accès Admin</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, color: theme.subtext, fontSize: 13 }}>
            Saisis le mot de passe pour activer l'édition.
          </p>
          <input 
            type="password" 
            value={adminPassword} 
            onChange={e => setAdminPassword(e.target.value)} 
            onKeyDown={e => { if (e.key === "Enter") onLogin(); }} 
            style={{ 
              width: "100%", 
              padding: 10, 
              borderRadius: 8, 
              border: `1px solid ${theme.border}`, 
              backgroundColor: theme.input, 
              color: theme.text,
              fontSize: 16,
            }} 
            placeholder="Mot de passe" 
          />
          {loginError && <div style={{ color: "#ef4444", fontSize: 12 }}>{loginError}</div>}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
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
              Annuler
            </button>
            <button 
              onClick={onLogin} 
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
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
