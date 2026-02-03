import React, { useEffect, useRef, useState } from "react";
import "../../../ui/animations/spiralPicker.css";

// Utilitaire pour convertir RGB en hex
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Composant de base : spirale + preview. (Aucun changement visuel.)
export default function SpiralColorPicker({ value, onChange, theme, small, smallSize, onPreviewChange }) {
  // Permet d'afficher une version réduite si prop small ou smallSize
  const isSmall = !!small || !!smallSize;
  const size = smallSize ? smallSize : (small ? 90 : 180);
  const canvasSize = smallSize ? Math.round(smallSize * 0.55) : (small ? 60 : 110);
  const previewSize = smallSize ? Math.round(smallSize * 0.14) : (small ? 13 : 22);
  const fontSize = smallSize ? Math.round(smallSize * 0.07) : (small ? 9 : 13);
  const canvasRef = useRef(null);
  const [rgb, setRgb] = useState([20, 100, 204]);
  const [cursorPos, setCursorPos] = useState({ x: canvasSize / 2, y: canvasSize / 2 });

  // Animation du curseur
  const [cursorGlow, setCursorGlow] = useState(0);
  React.useEffect(() => {
    let frame;
    function animate() {
      setCursorGlow(g => (g + 1) % 60);
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Dessine la spirale colorée sur le canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    // Spirale colorée (plus épaisse)
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 7;
    ctx.save();
    ctx.lineCap = "round";
    for (let a = 0; a < 360 * 3; a += 2) {
      const rad = (a * Math.PI) / 180;
      const r = radius * (a / (360 * 3));
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = `hsl(${a % 360}, 90%, 55%)`;
      ctx.shadowColor = `hsl(${a % 360}, 90%, 70%)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    // Curseur lumineux animé qui suit la souris, couleur réelle sous la souris
    // Calcul couleur sous la souris
    const cxCur = cursorPos.x;
    const cyCur = cursorPos.y;
    const dx = cxCur - cx;
    const dy = cyCur - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hCur = ((angle + 360) % 360);
    const sCur = Math.min(100, Math.max(40, dist / (w / 2) * 100));
    const lCur = 55;
    function hslToRgb(hh, ss, ll) {
      ss /= 100;
      ll /= 100;
      const k = n => (n + hh / 30) % 12;
      const a = ss * Math.min(ll, 1 - ll);
      const f = n =>
        ll - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    const rgbCur = hslToRgb(hCur, sCur, lCur);
    const colorCur = `rgb(${rgbCur[0]},${rgbCur[1]},${rgbCur[2]})`;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cursorPos.x, cursorPos.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = colorCur;
    ctx.shadowColor = colorCur;
    ctx.shadowBlur = 18 + 8 * Math.abs(Math.sin(cursorGlow * Math.PI / 30));
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.closePath();
    ctx.restore();
    // Notify parent of preview color (throttled via rAF)
    if (typeof onPreviewChange === 'function') {
      if (!canvasRef.current._previewRaf) {
        canvasRef.current._previewRaf = null;
      }
      const hex = rgbToHex(...rgbCur);
      if (canvasRef.current._lastPreview !== hex) {
        canvasRef.current._lastPreview = hex;
        if (canvasRef.current._previewRaf) cancelAnimationFrame(canvasRef.current._previewRaf);
        canvasRef.current._previewRaf = requestAnimationFrame(() => {
          onPreviewChange(hex);
          canvasRef.current._previewRaf = null;
        });
      }
    }
  }, [rgb, cursorGlow, cursorPos, value]);

  // Gestion du clic sur la spirale
  function handleCanvasClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Convertir angle/dist en couleur
    const hClick = ((angle + 360) % 360);
    const sClick = Math.min(100, Math.max(40, dist / (rect.width / 2) * 100));
    const lClick = 55;
    // hsl -> rgb
    function hslToRgb(hh, ss, ll) {
      ss /= 100;
      ll /= 100;
      const k = n => (n + hh / 30) % 12;
      const a = ss * Math.min(ll, 1 - ll);
      const f = n =>
        ll - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    const rgbVal = hslToRgb(hClick, sClick, lClick);
    setRgb(rgbVal);
    onChange(rgbToHex(...rgbVal));
  }

  // Curseur suit la souris et couleur preview
  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hMove = ((angle + 360) % 360);
    const sMove = Math.min(100, Math.max(40, dist / (rect.width / 2) * 100));
    const lMove = 55;
    function hslToRgb(hh, ss, ll) {
      ss /= 100;
      ll /= 100;
      const k = n => (n + hh / 30) % 12;
      const a = ss * Math.min(ll, 1 - ll);
      const f = n =>
        ll - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    const rgbVal = hslToRgb(hMove, sMove, lMove);
    setRgb(rgbVal);
    // also notify parent preview immediately (throttled by rAF in effect)
    if (typeof onPreviewChange === 'function') {
      const hex = rgbToHex(...rgbVal);
      if (canvasRef.current) {
        if (canvasRef.current._previewRaf) cancelAnimationFrame(canvasRef.current._previewRaf);
        canvasRef.current._previewRaf = requestAnimationFrame(() => {
          onPreviewChange(hex);
          canvasRef.current._previewRaf = null;
        });
      }
    }
  }

  // Gestion des sliders RGB
  function handleRgbChange(idx, val) {
    const newRgb = [...rgb];
    newRgb[idx] = Math.max(0, Math.min(255, Number(val)));
    setRgb(newRgb);
    onChange(rgbToHex(...newRgb));
  }

  return (
    <div style={{
      background: theme?.bg || 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)',
      borderRadius: isSmall ? 10 : 14,
      boxShadow: theme?.shadow || '0 4px 18px rgba(0,0,0,0.10)',
      padding: isSmall ? 6 : 12,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: isSmall ? size : 180,
      gap: isSmall ? 4 : 8,
      transform: isSmall ? undefined : 'scale(0.05) translateY(220px) translateX(-80px)',
      animation: isSmall ? undefined : 'popSlideGrow 1.6s cubic-bezier(.18,1.8,.22,1) forwards',
      overflow: 'visible',
    }}>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ borderRadius: isSmall ? 8 : 12, cursor: 'pointer', boxShadow: '0 0 16px #7c3aed88' }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseDown={e => e.stopPropagation()}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: isSmall ? 4 : 8 }}>
        <div style={{ width: previewSize, height: previewSize, borderRadius: '50%', background: rgbToHex(...rgb), boxShadow: '0 0 8px #fff8', border: '2.5px solid #fff' }} />
        <span
          style={{ color: theme?.text || '#fff', fontWeight: 600, fontSize: fontSize, padding: isSmall ? '1px 3px' : '2px 6px', borderRadius: 6, background: 'rgba(30,30,60,0.7)', cursor: 'pointer' }}
          title="Sélectionner cette couleur"
          onClick={() => onChange && onChange(rgbToHex(...rgb))}
        >
          {rgbToHex(...rgb)}
        </span>
      </div>
    </div>
  );
}
