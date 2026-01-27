import React from "react";

export default function Header({
  isMobile,
  isAuthenticated,
  editMode,
  setEditMode,
  setShowSearchModal,
  darkMode,
  setDarkMode,
  layout,
  theme,
  Emoji,
  showSectionPanel,
  setShowSectionPanel,
  selectedSectionId,
  setSelectedSectionId,
  selectedCategoryId,
  setSelectedCategoryId,
  setSearch,
  data,
  showGallery,
  setShowGallery,
  onHomeClick,
}) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 120,
        backgroundColor: theme.panel,
        backdropFilter: "none",
        padding: isMobile ? `${layout.headerPad/2 + 4}px 0 ${layout.headerPad/2 + 4}px 0` : `${layout.headerPad/2}px 20px`,
        paddingLeft: !isMobile ? (showSectionPanel ? layout.sideWidth : 0) + 32 : 0,
        minWidth: isMobile ? "100vw" : undefined,
        width: isMobile ? "100vw" : undefined,
        boxSizing: "border-box",
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: showSectionPanel && !isMobile
          ? "0 12px 40px 0 rgba(59,130,246,0.18), 0 2px 8px 0 #FFB36622"
          : theme.shadow,
        transition: "padding-left 0.7s cubic-bezier(.68,-0.6,0.32,1.6), box-shadow 0.55s cubic-bezier(.68,-0.6,0.32,1.6)",
        background: theme.panel,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: layout.headerRowGap, marginBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: layout.headerRowGap, minWidth: 0 }}>
          <button onClick={() => setShowSectionPanel(true)} style={{ padding: layout.headerButtonPad, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, fontSize: layout.headerIconSize, cursor: "pointer", flexShrink: 0 }}>☰</button>
          <h1 style={{ margin: 0, fontSize: layout.headerTitle, fontWeight: 800, background: `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.05px", lineHeight: 1.05, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>🛠️ Le Manuel</h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginLeft: 0,
            justifyContent: isMobile ? "space-between" : "flex-end"
          }}
        >
          {/* Bouton accueil */}
          <button
            onClick={onHomeClick}
            style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", flexShrink: 0 }}
          >🏠</button>
          <button
            onClick={() => setShowGallery(true)}
            style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: showGallery ? "#23202d" : `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)`, color: "white", border: "none", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>📷</button>
          {isAuthenticated && (
            <button
              onClick={() => setEditMode((v) => !v)}
              style={{
                padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad,
                minWidth: isMobile && isAuthenticated ? 15 : undefined,
                minHeight: isMobile && isAuthenticated ? 15 : undefined,
                borderRadius: 10,
                backgroundColor: editMode ? theme.accent1 : theme.panel,
                color: editMode ? 'white' : theme.text,
                border: `1px solid ${theme.border}`,
                cursor: "pointer",
                fontWeight: 600,
                flexShrink: 0,
                marginRight: 4
              }}
              title={editMode ? "Quitter le mode édition" : "Activer le mode édition"}
            >
              ✏️
            </button>
          )}
          <button onClick={() => setShowSearchModal(true)} style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", flexShrink: 0 }}>🔍</button>
          {(!isMobile) && (
            <button onClick={() => setDarkMode((d) => !d)} style={{ padding: layout.headerButtonPad, borderRadius: 10, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, flexShrink: 0 }}>
              {darkMode ? <Emoji symbol="☀️" label="Mode clair" size={layout.headerIconSize} /> : <Emoji symbol="🌙" label="Mode sombre" size={layout.headerIconSize} />}
            </button>
          )}
        </div>
      </div>
      {/* Barre des grandes parties (sections) juste sous le header */}
      <div className="chips-scroll" style={{ display: "flex", gap: 10, flexWrap: "nowrap", overflowX: "auto", padding: '8px 0 8px 0', alignItems: 'center', position: 'relative', top: 0, marginBottom: isAuthenticated && isMobile ? 2 : 8 }}>
        <button onClick={() => { setSelectedSectionId(null); setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "5px 10px", borderRadius: 16, backgroundColor: selectedSectionId === null ? `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)` : theme.panel, color: selectedSectionId === null ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 12, whiteSpace: "nowrap", fontWeight: 700 }}>📌 Tout</button>
        {data.sections.map((section) => (
          <button key={section.id} onClick={() => { setSelectedSectionId(section.id); setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "5px 10px", borderRadius: 16, backgroundColor: selectedSectionId === section.id ? section.color : theme.panel, color: selectedSectionId === section.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 12, whiteSpace: "nowrap", fontWeight: 700 }}>
            {section.emoji} {section.name}
          </button>
        ))}
      </div>
      {/* Barre des catégories sous le header (mobile ET desktop) */}
      {selectedSectionId && (
        <div
          className="chips-scroll"
          style={{
            marginTop: 0,
            marginBottom: isMobile ? 0 : 16,
            padding: `6px 0 8px 0`,
            display: "flex",
            gap: 10,
            flexWrap: "nowrap",
            overflowX: "auto",
            backgroundColor: theme.panel,
            borderBottom: `1px solid ${theme.border}`
          }}
        >
          <button onClick={() => { setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "4px 10px", borderRadius: 14, backgroundColor: selectedCategoryId === null ? theme.accent1 : theme.panel, color: selectedCategoryId === null ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>◆ Toutes</button>
          {data.categories.filter(cat => cat.sectionId === selectedSectionId).map((cat) => (
            <button key={cat.id} onClick={() => { setSelectedCategoryId(cat.id); setSearch(""); }} style={{ padding: "4px 10px", borderRadius: 14, backgroundColor: selectedCategoryId === cat.id ? cat.color || theme.accent1 : theme.panel, color: selectedCategoryId === cat.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
