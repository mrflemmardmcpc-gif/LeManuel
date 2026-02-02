import React from "react";

export default function Gallery({
  showGallery,
  setShowGallery,
  isAuthenticated,
  editMode,
  setEditMode,
  isAddingImage,
  setIsAddingImage,
  newImageCatId,
  setNewImageCatId,
  newImageSubId,
  setNewImageSubId,
  newImageDesc,
  setNewImageDesc,
  newImageUrl,
  setNewImageUrl,
  fileInputRef,
  onFileChange,
  saveImage,
  galleryUploadBusy,
  galleryCategories,
  galleryFilterSectionId,
  setGalleryFilterSectionId,
  galleryFilterCatId,
  setGalleryFilterCatId,
  filteredGalleryImages,
  theme,
  darkMode,
  layout,
  data,
  setSelectedCategoryId,
  setExpandedCategories,
  subRefs,
  }) {
    const padding = layout.modalPad || 20;
    
    if (!showGallery) return null;
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        background: "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.18), transparent 30%), rgba(0,0,0,0.82)", 
        backdropFilter: "blur(6px)", 
        zIndex: 200, 
        overflow: "auto", 
        padding: padding 
      }}>
        <div style={{ 
          maxWidth: 1180, 
          margin: "0 auto", 
          backgroundColor: darkMode ? "rgba(12,14,26,0.9)" : "rgba(255,255,255,0.94)", 
          borderRadius: 18, 
          padding: padding, 
          border: `1px solid ${theme.border}`, 
          boxShadow: "0 18px 50px rgba(0,0,0,0.35)" 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: 'nowrap', gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <h2 style={{ 
                margin: 0, 
                color: theme.accent1, 
                letterSpacing: 0.4,
                fontSize: 24,
              }}>📷 Galerie</h2>
              <span style={{ color: theme.subtext, fontSize: 13 }}>Ajoute, trie et consulte tes photos par module.</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {isAuthenticated && (
                <button 
                  onClick={() => setEditMode((e) => !e)} 
                  style={{ 
                    padding: "9px 14px", 
                    borderRadius: 10, 
                    background: editMode ? "linear-gradient(120deg, #10b981, #22d3ee)" : theme.panel, 
                    color: editMode ? "white" : theme.text, 
                    border: `1px solid ${theme.border}`, 
                    cursor: "pointer", 
                    fontWeight: 700, 
                    fontSize: 14,
                    boxShadow: editMode ? "0 8px 20px rgba(16,185,129,0.35)" : "none" 
                  }}
                >
                  {editMode ? "Mode édition" : "Editer"}
                </button>
              )}
              <button 
                onClick={() => setShowGallery(false)} 
                style={{ 
                  padding: "9px 12px", 
                  borderRadius: 10, 
                  backgroundColor: "#ef4444", 
                  color: "white", 
                  border: "none", 
                  cursor: "pointer", 
                  fontWeight: 700,
                  fontSize: 16,
                }}>✖</button>
            </div>
          </div>

          {isAuthenticated && editMode && (
            <button onClick={() => setIsAddingImage(!isAddingImage)} style={{ padding: "10px 16px", borderRadius: 12, background: isAddingImage ? "linear-gradient(120deg, #f97316, #fb7185)" : "linear-gradient(120deg, #10b981, #22c55e)", color: "white", border: "none", cursor: "pointer", marginBottom: 18, fontWeight: 800, boxShadow: "0 10px 25px rgba(0,0,0,0.18)", transition: "transform 120ms ease, box-shadow 120ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.22)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.18)"; }}>{isAddingImage ? "Fermer" : "Ajouter une photo"}</button>
          )}

          {isAddingImage && (
            <div style={{ background: darkMode ? "rgba(20,23,38,0.9)" : "rgba(248,250,252,0.9)", border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, marginBottom: 22, boxShadow: "0 10px 28px rgba(0,0,0,0.12)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontWeight: "bold", color: theme.text }}>Catégorie</label>
                <select
                  value={newImageCatId || ""}
                  onChange={(e) => setNewImageCatId(e.target.value ? parseInt(e.target.value) : null)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: darkMode ? "rgba(26,30,46,0.95)" : "#f8fafc",
                    color: theme.text,
                    boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.8)",
                    transition: "border-color 120ms ease, box-shadow 120ms ease"
                  }}
                >
                  <option value="">-- Sélectionne --</option>
                  {data.categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>))}
                </select>
              </div>
              {newImageCatId && (
                <div>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: "bold", color: theme.text }}>Module</label>
                  <select
                    value={newImageSubId || ""}
                    onChange={(e) => setNewImageSubId(e.target.value ? parseInt(e.target.value) : null)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: `1px solid ${theme.border}`,
                      backgroundColor: darkMode ? "rgba(26,30,46,0.95)" : "#f8fafc",
                      color: theme.text,
                      boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.8)",
                      transition: "border-color 120ms ease, box-shadow 120ms ease"
                    }}
                  >
                    <option value="">-- Sélectionne --</option>
                    {data.categories.find((cat) => cat.id === newImageCatId)?.subs.map((sub) => (<option key={sub.id} value={sub.id}>{sub.title}</option>))}
                  </select>
                </div>
              )}
              <div>
                <label style={{ display: "block", marginBottom: 8, fontWeight: "bold", color: theme.text }}>Description (optionnel)</label>
                <input value={newImageDesc} onChange={(e) => setNewImageDesc(e.target.value)} placeholder="Ex: angle du robinet" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: darkMode ? "rgba(26,30,46,0.95)" : "#f8fafc", color: theme.text, boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.8)", transition: "border-color 120ms ease, box-shadow 120ms ease" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px dashed ${theme.border}`, backgroundColor: darkMode ? "rgba(26,30,46,0.9)" : "#f8fafc", color: theme.text, transition: "border-color 120ms ease, box-shadow 120ms ease" }} />
                {newImageUrl && <img src={newImageUrl} alt="Preview" style={{ width: "100%", maxHeight: 200, borderRadius: 10, objectFit: "cover", border: `1px solid ${theme.border}` }} />}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={saveImage} disabled={galleryUploadBusy} style={{ flex: 1, padding: "10px 14px", borderRadius: 12, background: galleryUploadBusy ? "#6b7280" : "linear-gradient(120deg, #10b981, #0ea5e9)", color: "white", border: "none", cursor: galleryUploadBusy ? "not-allowed" : "pointer", fontWeight: 800 }}>
                    {galleryUploadBusy ? "Upload..." : "💾 Enregistrer"}
                  </button>
                  <button onClick={() => { setNewImageUrl(""); setNewImageCatId(null); setNewImageSubId(null); setNewImageDesc(""); }} disabled={galleryUploadBusy} style={{ padding: "10px 14px", borderRadius: 12, backgroundColor: "#6b7280", color: "white", border: "none", cursor: galleryUploadBusy ? "not-allowed" : "pointer", fontWeight: 700, opacity: galleryUploadBusy ? 0.75 : 1 }}>Annuler</button>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 18 }}>
            <div style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, boxShadow: theme.shadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: theme.subtext, fontSize: 12 }}>
                <span>🌐</span><span>Grande partie</span>
              </div>
              <select value={galleryFilterSectionId ?? ""} onChange={(e) => setGalleryFilterSectionId(e.target.value ? Number(e.target.value) : null)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }}>
                <option value="">Toutes</option>
                {data.sections.map((s) => (<option key={s.id} value={s.id}>{s.emoji} {s.name}</option>))}
              </select>
            </div>
            <div style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, boxShadow: theme.shadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: theme.subtext, fontSize: 12 }}>
                <span>📂</span><span>Catégorie</span>
              </div>
              <select value={galleryFilterCatId ?? ""} onChange={(e) => setGalleryFilterCatId(e.target.value ? Number(e.target.value) : null)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }}>
                <option value="">Toutes</option>
                {galleryCategories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
            {filteredGalleryImages.map((img) => (
              <div key={`${img.catId}-${img.subId}-${img.index}`} style={{ border: `1px solid ${theme.border}`, borderRadius: 14, overflow: "hidden", background: theme.panel, boxShadow: "0 12px 28px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative" }}>
                  <img src={img.url} alt={img.desc || img.subTitle} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 8, left: 8, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,0.55)", color: "white", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>{img.catName} • {img.subTitle}</div>
                </div>
                <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  {img.desc && <div style={{ fontSize: 13, color: theme.text }}>{img.desc}</div>}
                  <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                    <button onClick={() => { 
                      setSelectedCategoryId(img.catId); 
                      setExpandedCategories(prev => ({ ...prev, [img.catId]: true }));
                      setTimeout(() => {
                        const subRef = subRefs.current[img.subId];
                        if (subRef) {
                          subRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                          // fallback scroll
                        }
                      }, 150);
                      setShowGallery(false);
                    }} style={{ flex: 1, padding: "10px", borderRadius: 10, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 800, boxShadow: "0 8px 18px rgba(59,130,246,0.35)" }}>👁️ Voir</button>
                    {isAuthenticated && editMode && (
                      <button onClick={() => img.deleteImage(img.catId, img.subId, img.index)} style={{ width: 44, padding: "10px", borderRadius: 10, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 800 }}>🗑️</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
