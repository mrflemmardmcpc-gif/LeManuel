import React, { useState } from "react";
import { FaHighlighter } from "react-icons/fa";
import { MdFormatColorText } from "react-icons/md";
import SpiralColorPicker from "./SpiralColorPicker";
import "../../../ui/animations/spiralPicker.css";

function normalizeColor(col) {
  if (!col) return "";
  if (typeof col === "string" && col[0] === "#") return col.toLowerCase();
  if (/^rgb\s*\(/i.test(col)) {
    const nums = col.match(/\d+/g);
    if (nums && nums.length >= 3) {
      return (
        "#" +
        nums
          .slice(0, 3)
          .map(x => {
            const hex = parseInt(x, 10).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("")
      ).toLowerCase();
    }
  }
  return col.toString().toLowerCase();
}

function makeFavoritesState(getKey) {
  const read = type => {
    try {
      const saved = localStorage.getItem(getKey(type));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };
  return {
    read,
    write(type, arr) {
      try {
        localStorage.setItem(getKey(type), JSON.stringify(arr));
      } catch {
        /* ignore */
      }
    },
  };
}

export default function SpiralColorPickerDoubleModal({
  value,
  onChange,
  theme,
  pickerKey = "default",
  showTextPicker,
  showHighlightPicker,
  activePicker,
  setActivePicker,
  textIconNode,
  highlightIconNode,
  isMobile = false,
}) {
  const getFavoritesKey = type => "spiralFavorites_" + type;
  const favoritesStore = makeFavoritesState(getFavoritesKey);
  const [favoriteColorsText, setFavoriteColorsText] = useState(() => favoritesStore.read("text"));
  const [previewText, setPreviewText] = useState(null);
  const [previewHighlight, setPreviewHighlight] = useState(null);
  const textRootRef = React.useRef(null);
  const highlightRootRef = React.useRef(null);
  const previewTargetRef = React.useRef(null);
  const previewCurrentRef = React.useRef([124, 58, 237]);
  const previewRafRef = React.useRef(null);

  function hexToRgb(hex) {
    if (!hex) return [124, 58, 237];
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const bigint = parseInt(full, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  function rgbArrToHex([r, g, b]) {
    const toHex = v => {
      const h = v.toString(16);
      return h.length === 1 ? '0' + h : h;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  

  function setCssMicroGlowFromRgb(rgb, ref) {
    const root = ref && ref.current;
    if (!root) return;
    const soft = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.16)`;
    const inset = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.22)`;
    root.style.setProperty('--spiral-glow-soft', soft);
    root.style.setProperty('--spiral-glow-inset', inset);
  }

  function startMicroLerp(targetRef) {
    if (previewRafRef.current) return;
    const factor = 0.28;
    const tick = () => {
      const target = previewTargetRef.current || [124, 58, 237];
      const cur = previewCurrentRef.current.slice();
      let changed = false;
      const next = cur.map((c, i) => {
        const t = target[i];
        const n = Math.round(c + (t - c) * factor);
        if (Math.abs(n - t) > 1) changed = true;
        return n;
      });
      previewCurrentRef.current = next;
      setCssMicroGlowFromRgb(next, targetRef);
      if (changed) previewRafRef.current = requestAnimationFrame(tick);
      else previewRafRef.current = null;
    };
    previewRafRef.current = requestAnimationFrame(tick);
  }

  function handlePreviewIncoming(hex, type) {
    try {
      const rgb = hexToRgb(hex === 'none' ? null : hex);
      const immediateHex = hex === 'none' ? rgbArrToHex(rgb) : hex;
      if (type === 'text') {
        setPreviewText(immediateHex);
        if (textRootRef.current) textRootRef.current.style.setProperty('--spiral-glow', hexToRgba(immediateHex, 0.55));
        previewTargetRef.current = rgb;
        previewCurrentRef.current = previewCurrentRef.current || rgb.slice();
        startMicroLerp(textRootRef);
      } else {
        setPreviewHighlight(immediateHex);
        if (highlightRootRef.current) highlightRootRef.current.style.setProperty('--spiral-glow', hexToRgba(immediateHex, 0.55));
        previewTargetRef.current = rgb;
        previewCurrentRef.current = previewCurrentRef.current || rgb.slice();
        startMicroLerp(highlightRootRef);
      }
    } catch (e) {
      /* ignore */
    }
  }

  React.useEffect(() => {
    // initialize preview color from current value when available (for active picker)
    try {
      const n = normalizeColor(value);
      if (n && n !== "none") {
        if (activePicker === 'text') {
          setPreviewText(n);
          if (textRootRef.current) textRootRef.current.style.setProperty('--spiral-glow', hexToRgba(n, 0.55));
        } else {
          setPreviewHighlight(n);
          if (highlightRootRef.current) highlightRootRef.current.style.setProperty('--spiral-glow', hexToRgba(n, 0.55));
        }
      }
    } catch (e) {
      /* ignore */
    }
  }, [value, activePicker]);
  const [favoriteColorsHighlight, setFavoriteColorsHighlight] = useState(() => favoritesStore.read("highlight"));

  const getFavorites = type => (type === "text" ? favoriteColorsText : favoriteColorsHighlight);
  const setFavorites = (type, arr) => {
    if (type === "text") setFavoriteColorsText(arr);
    else setFavoriteColorsHighlight(arr);
    favoritesStore.write(type, arr);
  };

  function toggleFavorite(color, type) {
    const normalized = normalizeColor(color);
    if (!normalized || normalized === "none") return;
    const list = getFavorites(type);
    const exists = list.includes(normalized);
    const next = exists ? list.filter(c => c !== normalized) : [...list, normalized];
    setFavorites(type, next);
  }

  const [isSwitching, setIsSwitching] = useState(false);

  function handleChange(color) {
    if (window.event) {
      window.event.stopPropagation();
    }
    onChange && onChange(color);
  }

  function hexToRgba(hex, a = 1) {
    if (!hex || hex === 'none') return `rgba(124,58,237,${a})`;
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  const bothOpen = showTextPicker && showHighlightPicker;
  const isText = pickerKey === "text";
  const isHighlight = pickerKey === "highlight";

  const handleSwitch = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    setTimeout(() => {
      if (setActivePicker) {
        setActivePicker(activePicker === "text" ? "highlight" : "text");
      }
      setIsSwitching(false);
    }, 500);
  };

  const renderTextClear = (color, onClear) => (
    <button
      style={{
        background: "none",
        border: "none",
        color: color && color !== "#fff" && color !== "#ffffff" && color !== "none" ? "#fbbf24" : "#fff",
        fontWeight: 900,
        fontSize: 22,
        cursor: "pointer",
        padding: 0,
        lineHeight: 1,
        textShadow: "0 1px 2px #0008",
        borderBottom:
          color && color !== "#fff" && color !== "#ffffff" && color !== "none" ? "2.5px solid #fbbf24" : "none",
        borderRadius: 2,
        transition: "border-bottom 0.18s, color 0.18s",
      }}
      title={color && color !== "#fff" && color !== "#ffffff" && color !== "none" ? "Retirer la couleur du texte" : "Aucune couleur"}
      onClick={e => {
        e.stopPropagation();
        onClear();
      }}
      onMouseDown={e => e.stopPropagation()}
    >
      {textIconNode || "A"}
    </button>
  );

  const renderHighlightClear = (color, onClear) => (
    <button
      style={{
        background: "none",
        border: "none",
        color: color && color !== "#fbbf24" && color !== "none" ? "#fbbf24" : "#fff",
        fontWeight: 900,
        fontSize: 22,
        cursor: "pointer",
        padding: 0,
        lineHeight: 1,
        textShadow: "0 1px 2px #0008",
        borderBottom: color && color !== "#fbbf24" && color !== "none" ? "2.5px solid #fbbf24" : "none",
        borderRadius: 2,
        transition: "border-bottom 0.18s, color 0.18s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={color && color !== "#fbbf24" && color !== "none" ? "Retirer le surlignement" : "Aucun surlignement"}
      onClick={e => {
        e.stopPropagation();
        onClear();
      }}
      onMouseDown={e => e.stopPropagation()}
    >
      {highlightIconNode || <FaHighlighter style={{ fontSize: 20, color: color && color !== "#fbbf24" && color !== "none" ? "#fbbf24" : "#fff", verticalAlign: "middle", filter: "drop-shadow(0 1px 2px #0008)" }} />}
    </button>
  );

  return (
    <div
      id={`spiral-modal-content-${pickerKey}`}
      style={{
        display: (bothOpen && !isMobile) ? "flex" : "block",
        flexDirection: (bothOpen && !isMobile) ? "row" : "column",
        alignItems: "center",
        gap: (bothOpen && !isMobile) ? 0 : 8,
        position: "relative",
        zIndex: 1,
        background: "rgba(0,0,0,0)",
        boxShadow: "none",
        border: "none",
        padding: 0,
        minWidth: (bothOpen && !isMobile) ? 480 : isMobile ? 'auto' : 220,
        minHeight: isMobile ? 'auto' : 220,
        marginTop: 0,
        overflow: "visible",
        perspective: (bothOpen && !isMobile) ? 1200 : undefined,
      }}
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Mobile: single picker only, no mirror effect */}
      {isMobile ? (
        <div
          ref={activePicker === "text" ? textRootRef : highlightRootRef}
          style={{
            width: '100%',
            maxWidth: 280,
            margin: '0 auto',
            background: activePicker === "text"
              ? "linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)"
              : "linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)",
            borderRadius: 16,
            boxShadow: `0 8px 24px 0 var(--spiral-glow, rgba(124,58,237,0.35))`,
            border: "2px solid #f59e42",
            padding: 14,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ position: "absolute", top: 6, right: 10, zIndex: 5, opacity: 0.92 }}>
            {activePicker === "text"
              ? renderTextClear(value, () => onChange && onChange("none"))
              : renderHighlightClear(value, () => onChange && onChange("none"))}
          </div>
          <SpiralColorPicker 
            value={value} 
            onChange={handleChange} 
            theme={theme} 
            smallSize={180}
            onPreviewChange={hex => handlePreviewIncoming(hex, activePicker)} 
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 8, width: "100%" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: getFavorites(activePicker).includes(value) ? theme?.accent1 || "#fbbf24" : "#fff",
                fontSize: 20,
                cursor: "pointer",
                transition: "color 0.18s, transform 0.18s",
              }}
              title={getFavorites(activePicker).includes(value) ? "Retirer des favoris" : "Enregistrer en favori"}
              onClick={() => toggleFavorite(value, activePicker)}
              onMouseDown={e => e.stopPropagation()}
            >
              {getFavorites(activePicker).includes(value) ? "★" : "☆"}
            </button>
            <div className="favorites-scroll-x" style={{ marginTop: 0, maxWidth: '100%' }}>
              <div style={{ display: 'flex', gap: 4, padding: '2px 0' }}>
                {getFavorites(activePicker).length === 0 && (
                  <span style={{ color: "#888", fontSize: 12 }}>Aucun favori</span>
                )}
                {getFavorites(activePicker).map(c => (
                  <button
                    key={c}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      background: c,
                      border: value === c ? "2px solid #fff" : "1px solid #666",
                      cursor: "pointer",
                      boxShadow: value === c ? "0 0 0 2px #fff, 0 0 6px #f59e42" : "none",
                      transition: "box-shadow 0.18s",
                      flexShrink: 0,
                    }}
                    title={`Favori ${c}`}
                    onClick={() => handleChange(c)}
                    onMouseDown={e => e.stopPropagation()}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : bothOpen ? (
        <>
          {(() => {
            const activeIsText = activePicker === "text";
            return (
              <>
                <div
                  ref={activeIsText ? textRootRef : highlightRootRef}
                  className={`spiral-swipe active ${isSwitching ? "spiral-anim-right" : ""}`}
                  style={{
                    width: 240,
                    minHeight: 240,
                    marginRight: -18,
                    pointerEvents: "auto",
                    background: activeIsText
                      ? "linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)"
                      : "linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)",
                    borderRadius: 18,
                      boxShadow: `0 24px 64px 0 var(--spiral-glow, rgba(124,58,237,0.55)), 0 8px 32px var(--spiral-glow-soft, rgba(124,58,237,0.16)), 0 0 0 4px var(--spiral-glow-inset, rgba(124,58,237,0.22)) inset`,
                    border: "2.5px solid #f59e42",
                    padding: 18,
                    position: "relative",
                    transform: "rotateY(-18deg) scale(1.04) translateZ(24px)",
                    filter: "blur(0.5px) saturate(1.08)",
                    zIndex: 2,
                    transition: "transform 0.42s cubic-bezier(.7,1.8,.22,1), box-shadow 0.09s linear, filter 0.09s",
                    backdropFilter: "blur(8px) brightness(1.08)",
                  }}
                  onClick={() => setActivePicker && (activeIsText ? setActivePicker("text") : setActivePicker("highlight"))}
                >
                  <div style={{ position: "absolute", top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
                    {activeIsText
                      ? renderTextClear(value, () => onChange && onChange("none"))
                      : renderHighlightClear(value, () => onChange && onChange("none"))}
                  </div>
                  <SpiralColorPicker value={value} onChange={handleChange} theme={theme} onPreviewChange={hex => handlePreviewIncoming(hex, activeIsText ? 'text' : 'highlight')} />
                  {(activeIsText ? isText : isHighlight) && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, margin: "18px 0 0 0", width: "100%", justifyContent: "center" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: getFavorites(activeIsText ? "text" : "highlight").includes(value)
                            ? theme?.accent1 || "#fbbf24"
                            : "#fff",
                          fontSize: 22,
                          cursor: "pointer",
                          transition: "color 0.18s, transform 0.18s",
                          marginBottom: 0,
                        }}
                        title={getFavorites(activeIsText ? "text" : "highlight").includes(value) ? "Retirer des favoris" : "Enregistrer en favori"}
                        onClick={() => toggleFavorite(value, activeIsText ? "text" : "highlight")}
                        onMouseDown={e => e.stopPropagation()}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        {getFavorites(activeIsText ? "text" : "highlight").includes(value) ? "★" : "☆"}
                      </button>
                      <div className="favorites-scroll-x" style={{ marginTop: 0 }}>
                        <div
                          style={{
                            width: 160,
                            minHeight: 24,
                            overflowX: "auto",
                            overflowY: "hidden",
                            display: "block",
                            whiteSpace: "nowrap",
                            padding: "2px 0 14px 0",
                            margin: "0 auto",
                            boxSizing: "border-box",
                            scrollbarGutter: "stable",
                          }}
                        >
                          {getFavorites(activeIsText ? "text" : "highlight").length === 0 && (
                            <span style={{ color: "#888", fontSize: 13 }}>Aucun favori</span>
                          )}
                          {getFavorites(activeIsText ? "text" : "highlight").map(c => (
                            <button
                              key={c}
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: 2,
                                background: c,
                                border: value === c ? "2px solid #fff" : "1px solid #888",
                                margin: 2,
                                cursor: "pointer",
                                boxShadow: value === c ? "0 0 0 2px #fff, 0 0 8px #f59e42" : "none",
                                transition: "box-shadow 0.18s, transform 0.18s",
                                display: "inline-block",
                                padding: 0,
                                boxSizing: "border-box",
                              }}
                              title={`Favori ${c}`}
                              onClick={() => handleChange(c)}
                              onMouseDown={e => e.stopPropagation()}
                              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
                              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  ref={!activeIsText ? textRootRef : highlightRootRef}
                  className={`spiral-swipe mirror ${isSwitching ? "spiral-anim-left" : ""}`}
                  style={{
                    width: 210,
                    minHeight: 130,
                    height: "auto",
                    marginLeft: -23,
                    pointerEvents: isSwitching ? "none" : "auto",
                    background: !activeIsText
                      ? "linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)"
                      : "linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)",
                    borderRadius: 18,
                      boxShadow: `0 24px 64px 0 var(--spiral-glow, rgba(124,58,237,0.55)), 0 8px 32px var(--spiral-glow-soft, rgba(124,58,237,0.16)), 0 0 0 4px var(--spiral-glow-inset, rgba(124,58,237,0.22)) inset`,
                    border: "2.5px solid #f59e42",
                    padding: "22px 12px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    transform: "rotateY(-22deg) scale(0.92) translateZ(2px) translateX(12px) translateY(12px)",
                    opacity: 0.98,
                    filter: "blur(1.5px)",
                    zIndex: 1,
                    transition: "transform 0.42s cubic-bezier(.7,1.8,.22,1), box-shadow 0.09s linear, filter 0.09s",
                    backdropFilter: "none",
                    overflow: "visible",
                  }}
                  onClick={() => {
                    if (!isSwitching) handleSwitch();
                  }}
                >
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 0, marginBottom: 0 }}>
                    <div style={{ position: "absolute", top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
                      {activeIsText
                        ? highlightIconNode || <FaHighlighter style={{ fontSize: 20, color: "#fbbf24", filter: "drop-shadow(0 1px 2px #0008)" }} title="Surligneur" />
                        : textIconNode || <MdFormatColorText style={{ fontSize: 22, color: "#fbbf24", filter: "drop-shadow(0 1px 2px #0008)" }} title="Texte" />}
                    </div>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", marginTop: "auto", marginBottom: 10 }}>
                      <SpiralColorPicker value={value} onChange={handleChange} theme={theme} smallSize={170} onPreviewChange={hex => handlePreviewIncoming(hex, activeIsText ? 'highlight' : 'text')} />
                    </div>
                    {(!activeIsText ? isHighlight : isText) && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, margin: "18px 0 0 0", width: "100%", justifyContent: "center" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: getFavorites(activeIsText ? "highlight" : "text").includes(value)
                              ? theme?.accent1 || "#fbbf24"
                              : "#fff",
                            fontSize: 22,
                            cursor: "pointer",
                            transition: "color 0.18s, transform 0.18s",
                            marginBottom: 0,
                          }}
                          title={getFavorites(activeIsText ? "highlight" : "text").includes(value) ? "Retirer des favoris" : "Enregistrer en favori"}
                          onClick={() => toggleFavorite(value, activeIsText ? "highlight" : "text")}
                          onMouseDown={e => e.stopPropagation()}
                          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
                          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                        >
                          {getFavorites(activeIsText ? "highlight" : "text").includes(value) ? "★" : "☆"}
                        </button>
                        <div className="favorites-scroll-x" style={{ marginTop: 0 }}>
                          <div
                            style={{
                              width: 155,
                              minHeight: 24,
                              overflowX: "auto",
                              overflowY: "hidden",
                              display: "block",
                              whiteSpace: "nowrap",
                              padding: "2px 0 14px 0",
                              margin: "0 auto",
                              boxSizing: "border-box",
                              scrollbarGutter: "stable",
                            }}
                          >
                            {getFavorites(activeIsText ? "highlight" : "text").length === 0 && (
                              <span style={{ color: "#888", fontSize: 13 }}>Aucun favori</span>
                            )}
                            {getFavorites(activeIsText ? "highlight" : "text").map(c => (
                              <button
                                key={c}
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 2,
                                  background: c,
                                  border: value === c ? "2px solid #fff" : "1px solid #888",
                                  margin: 2,
                                  cursor: "pointer",
                                  boxShadow: value === c ? "0 0 0 2px #fff, 0 0 8px #f59e42" : "none",
                                  transition: "box-shadow 0.18s, transform 0.18s",
                                  display: "inline-block",
                                  padding: 0,
                                  boxSizing: "border-box",
                                }}
                                title={`Favori ${c}`}
                                onClick={() => handleChange(c)}
                                onMouseDown={e => e.stopPropagation()}
                                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
                                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </>
      ) : (
        <div
          style={{
            width: 240,
            minHeight: 240,
            background:
              pickerKey === "text"
                ? "linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)"
                : "linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)",
            borderRadius: 18,
            boxShadow:
              pickerKey === "text"
                ? "0 12px 48px 0 #000b, 0 2px 16px #7c3aedcc"
                : "0 8px 32px 0 #0008, 0 2px 8px #7c3aed88",
            border: "2.5px solid #f59e42",
            padding: 18,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 2,
            filter: pickerKey === "text" ? "blur(0.5px) saturate(1.08)" : "blur(0.2px) saturate(1)",
            backdropFilter: pickerKey === "text" ? "blur(12px) brightness(1.10)" : "blur(3px)",
            overflow: "visible",
          }}
        >
          <div style={{ position: "absolute", top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
            {pickerKey === "text"
              ? renderTextClear(value, () => onChange && onChange("none"))
              : renderHighlightClear(value, () => onChange && onChange("none"))}
          </div>
          <SpiralColorPicker value={value} onChange={handleChange} theme={theme} onPreviewChange={hex => handlePreviewIncoming(hex, pickerKey)} />
          <div style={{ display: "none" }} onMouseDown={e => e.stopPropagation()} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, margin: "18px 0 0 0", width: "100%", justifyContent: "center" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: getFavorites(pickerKey).includes(value) ? theme?.accent1 || "#fbbf24" : "#fff",
                fontSize: 22,
                cursor: "pointer",
                transition: "color 0.18s, transform 0.18s",
                marginBottom: 0,
              }}
              title={getFavorites(pickerKey).includes(value) ? "Retirer des favoris" : "Enregistrer en favori"}
              onClick={() => toggleFavorite(value, pickerKey)}
              onMouseDown={e => e.stopPropagation()}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              {getFavorites(pickerKey).includes(value) ? "★" : "☆"}
            </button>
            <div className="favorites-scroll-x" style={{ marginTop: 0 }}>
              <div
                style={{
                  width: 160,
                  minHeight: 24,
                  overflowX: "auto",
                  overflowY: "hidden",
                  display: "block",
                  whiteSpace: "nowrap",
                  padding: "2px 0 14px 0",
                  margin: "0 auto",
                  boxSizing: "border-box",
                  scrollbarGutter: "stable",
                }}
              >
                {getFavorites(pickerKey).length === 0 && <span style={{ color: "#888", fontSize: 13 }}>Aucun favori</span>}
                {getFavorites(pickerKey).map(c => (
                  <button
                    key={c}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 2,
                      background: c,
                      border: value === c ? "2px solid #fff" : "1px solid #888",
                      margin: 2,
                      cursor: "pointer",
                      boxShadow: value === c ? "0 0 0 2px #fff, 0 0 8px #f59e42" : "none",
                      transition: "box-shadow 0.18s, transform 0.18s",
                      display: "inline-block",
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                    title={`Favori ${c}`}
                    onClick={() => handleChange(c)}
                    onMouseDown={e => e.stopPropagation()}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
