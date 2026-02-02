import React from "react";
import ResponsiveModal from "../components/ui/ResponsiveModal";
import { useResponsive, getResponsiveButtonStyle } from "../utils/responsive";

function LoginModal({ open, onClose, onLogin, adminPassword, setAdminPassword, loginError, darkMode, theme }) {
  const screen = useResponsive();
  const buttonStyle = getResponsiveButtonStyle(screen);

  return (
    <ResponsiveModal
      isOpen={open}
      onClose={onClose}
      size="small"
      title="Accès Admin"
      theme={theme}
      showCloseButton={false}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0, color: theme.subtext, fontSize: screen.isMobile ? 12 : 13 }}>
          Saisis le mot de passe pour activer l'édition.
        </p>
        <input 
          type="password" 
          value={adminPassword} 
          onChange={e => setAdminPassword(e.target.value)} 
          onKeyDown={e => { if (e.key === "Enter") onLogin(); }} 
          style={{ 
            width: "100%", 
            padding: screen.isMobile ? 8 : 10, 
            borderRadius: 8, 
            border: `1px solid ${theme.border}`, 
            backgroundColor: theme.input, 
            color: theme.text,
            fontSize: screen.isMobile ? 14 : 16,
          }} 
          placeholder="Mot de passe" 
        />
        {loginError && <div style={{ color: "#ef4444", fontSize: 12 }}>{loginError}</div>}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
          <button 
            onClick={onClose} 
            style={{ 
              ...buttonStyle,
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
              ...buttonStyle,
              backgroundColor: "#10b981", 
              color: "white", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: 700 
            }}
          >
            Valider
          </button>
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default LoginModal;
