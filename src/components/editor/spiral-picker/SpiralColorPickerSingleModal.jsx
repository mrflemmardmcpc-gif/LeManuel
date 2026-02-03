import React, { useState, useEffect, useRef } from "react";
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

export default function SpiralColorPickerSingleModal({
  value,
  onChange,
  theme,
  pickerKey = "default",
  clearButton,
}) {
  const getFavoritesKey = type => "spiralFavorites_" + type;
  const favoritesStore = makeFavoritesState(getFavoritesKey);
  const [favoriteColors, setFavoriteColors] = useState(() => favoritesStore.read(pickerKey));
  const [previewColor, setPreviewColor] = useState(null);
  const previewTargetRef = useRef(null);
  const previewCurrentRef = useRef([124, 58, 237]);
  const previewRafRef = useRef(null);

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

  function hexToRgba(hex, a = 1) {
    if (!hex || hex === 'none') return `rgba(124,58,237,${a})`;
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  useEffect(() => {
    try {
      const n = normalizeColor(value);
      if (n && n !== 'none') setPreviewColor(n);
    } catch (e) {}
  }, [value]);

  const rootRef = useRef(null);

  useEffect(() => {
    if (rootRef.current && previewColor) {
      rootRef.current.style.setProperty('--spiral-glow', hexToRgba(previewColor, 0.55));
      rootRef.current.style.setProperty('--spiral-glow-soft', hexToRgba(previewColor, 0.16));
      rootRef.current.style.setProperty('--spiral-glow-inset', hexToRgba(previewColor, 0.22));
    }
  }, [previewColor]);

  function setCssMicroGlowFromRgb(rgb) {
    if (!rootRef.current) return;
    const soft = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.16)`;
    const inset = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.22)`;
    rootRef.current.style.setProperty('--spiral-glow-soft', soft);
    rootRef.current.style.setProperty('--spiral-glow-inset', inset);
  }

  function startMicroLerp() {
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
      setCssMicroGlowFromRgb(next);
      if (changed) previewRafRef.current = requestAnimationFrame(tick);
      else previewRafRef.current = null;
    };
    previewRafRef.current = requestAnimationFrame(tick);
  }

  function setFavorites(arr) {
    setFavoriteColors(arr);
    favoritesStore.write(pickerKey, arr);
  }

  function toggleFavorite(color) {
    const normalized = normalizeColor(color);
    if (!normalized || normalized === "none") return;
    const exists = favoriteColors.includes(normalized);
    const next = exists ? favoriteColors.filter(c => c !== normalized) : [...favoriteColors, normalized];
    setFavorites(next);
  }

  function handleChange(color) {
    if (window.event) {
      window.event.stopPropagation();
    }
    onChange && onChange(color);
  }

  // Real-time preview handler: set immediately
  function handlePreviewIncoming(hex) {
    try {
      const rgb = hexToRgb(hex === 'none' ? null : hex);
      previewTargetRef.current = rgb;
      previewCurrentRef.current = rgb.slice();
      if (previewRafRef.current) {
        cancelAnimationFrame(previewRafRef.current);
        previewRafRef.current = null;
      }
      const immediateHex = hex === 'none' ? rgbArrToHex(rgb) : hex;
      setPreviewColor(immediateHex);
      // update primary var immediately and start micro-lerp for soft layers
      if (rootRef.current) rootRef.current.style.setProperty('--spiral-glow', hexToRgba(immediateHex, 0.55));
      startMicroLerp();
    } catch (e) {
      /* ignore */
    }
  }

  return (
    <div
      ref={rootRef}
      style={{
        width: 240,
        minHeight: 240,
        background:
          pickerKey === "text"
            ? "linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)"
            : "linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)",
        borderRadius: 18,
        boxShadow: pickerKey === "text"
          ? `0 12px 48px 0 ${hexToRgba(previewColor,0.55)}, 0 2px 16px ${hexToRgba(previewColor,0.2)}`
          : `0 8px 32px 0 ${hexToRgba(previewColor,0.55)}, 0 2px 8px ${hexToRgba(previewColor,0.18)}`,
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
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
    >
      {clearButton && (
        <div style={{ position: "absolute", top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
          {clearButton}
        </div>
      )}
      <SpiralColorPicker value={value} onChange={handleChange} theme={theme} onPreviewChange={handlePreviewIncoming} />
      <div style={{ display: "none" }} onMouseDown={e => e.stopPropagation()} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, margin: "18px 0 0 0", width: "100%", justifyContent: "center" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: favoriteColors.includes(value) ? theme?.accent1 || "#fbbf24" : "#fff",
            fontSize: 22,
            cursor: "pointer",
            transition: "color 0.18s, transform 0.18s",
            marginBottom: 0,
          }}
          title={favoriteColors.includes(value) ? "Retirer des favoris" : "Enregistrer en favori"}
          onClick={() => toggleFavorite(value)}
          onMouseDown={e => e.stopPropagation()}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.18)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {favoriteColors.includes(value) ? "★" : "☆"}
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
            {favoriteColors.length === 0 && <span style={{ color: "#888", fontSize: 13 }}>Aucun favori</span>}
            {favoriteColors.map(c => (
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
  );
}
