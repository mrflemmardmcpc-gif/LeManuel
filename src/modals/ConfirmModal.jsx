import React from "react";
import ResponsiveModal from "../components/ui/ResponsiveModal";
import { useResponsive, getResponsiveButtonStyle } from "../utils/responsive";

function ConfirmModal({ open, onClose, onConfirm, message, darkMode, theme }) {
  const screen = useResponsive();
  const buttonStyle = getResponsiveButtonStyle(screen);

  return (
    <ResponsiveModal
      isOpen={open}
      onClose={onClose}
      size="small"
      title="Confirmation"
      theme={theme}
      showCloseButton={false}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ color: theme.text, fontSize: screen.isMobile ? 14 : 16 }}>{message}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
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
            Retour
          </button>
          <button 
            onClick={onConfirm} 
            style={{ 
              ...buttonStyle,
              backgroundColor: "#10b981", 
              color: "white", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: 700 
            }}
          >
            Continuer
          </button>
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default ConfirmModal;
