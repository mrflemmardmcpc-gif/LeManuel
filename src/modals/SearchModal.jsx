import React from "react";

function SearchModal({ open, onClose, search, setSearch, theme }) {
  if (!open) return null;
  
  return (
    <div 
      style={{ 
        position: "fixed", 
        inset: 0, 
        backgroundColor: "rgba(0,0,0,0.4)", 
        zIndex: 150, 
        display: "flex", 
        alignItems: "flex-start", 
        justifyContent: "center", 
        paddingTop: 20 
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          backgroundColor: theme.panel, 
          borderRadius: 12, 
          padding: 16, 
          width: "90%", 
          maxWidth: 500 
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: theme.accent1, fontSize: screen.isMobile ? 16 : 18 }}>
            🔍 Rechercher
          </h3>
          <button 
            onClick={onClose} 
            style={{ 
              padding: screen.isMobile ? "4px 10px" : "6px 12px", 
              borderRadius: 6, 
              backgroundColor: "#ef4444", 
              color: "white", 
              border: "none", 
              cursor: "pointer",
              fontSize: screen.isMobile ? 14 : 16,
            }}
          >
            ✖
          </button>
        </div>
        <input 
          type="search" 
          placeholder="Rechercher..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          onKeyDown={e => { if (e.key === 'Enter') onClose(); }} 
          autoFocus 
          style={{ 
            width: "100%", 
            padding: screen.isMobile ? 10 : 12, 
            borderRadius: 8, 
            border: `1px solid ${theme.border}`, 
            backgroundColor: theme.bg, 
            color: theme.text,
            fontSize: screen.isMobile ? 14 : 16,
          }} 
        />
      </div>
    </div>
  );
}

export default SearchModal;
