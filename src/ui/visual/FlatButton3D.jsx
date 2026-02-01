// FlatButton3D.jsx
// Bouton rectangulaire principal, 100% personnalisable, avec effet flip3D horizontal ou vertical
import React from "react";
import "../animations/spin3D.css";
import PropTypes from "prop-types";

// Import du hook 3D universel
import { useSpin3D } from "../animations/useSpin3D";
import { useFlip3D } from "../animations/flip3D";

/**
 * FlatButton3D
 * @param {object} props
 * @param {string} [props.children] - Contenu du bouton (texte, icône, etc.)
 * @param {string} [props.color] - Couleur de fond principale ou dégradé
 * @param {string} [props.textColor] - Couleur du texte
 * @param {string} [props.gradient] - Dégradé CSS (prioritaire sur color)
 * @param {number} [props.radius] - Rayon de bordure
 * @param {string} [props.shadow] - Box-shadow
 * @param {string} [props.fontWeight] - Poids du texte
 * @param {string} [props.fontSize] - Taille du texte
 * @param {function} [props.onClick] - Callback au clic
 * @param {object} [props.style] - Style additionnel
 * @param {string} [props.className] - Classe CSS additionnelle
 * @param {object} [props.flipOptions] - Options pour l'effet flip3D (axe, durée, etc.)
 */
export default function FlatButton3D({
  children,
  color = "#271d44",
  textColor = "#fff",
  gradient,
  radius = 12,
  shadow = "0 4px 24px 0 #3a2a5c88, 0 2px 8px #fff4, 0 0 0 2px #fff2",
  fontWeight = 800,
  fontSize = 17,
  onClick,
  style = {},
  className = "",
  flipOptions = {},
  cube = false, // active le mode RectCubeButton
  cubeDepth = 36, // épaisseur du cube (px)
  cubeColors = {}, // couleurs des faces latérales {left, right, top, bottom}
  glass = false, // nouveau : applique l'effet glassmorphism si true
  ...props
}) {

  // Hook 3D universel (remplace la logique manuelle d’animation)
  const [spinStyle, triggerSpin, spinning] = useSpin3D({
    axis: (flipOptions.axis || 'X'),
    duration: flipOptions.duration || 600,
    easing: flipOptions.easing || 'cubic-bezier(.4,2,.3,1)',
    perspective: flipOptions.perspective || '800px',
  });

  const { flipped, triggerFlip, flipClass } = useFlip3D({ axis: 'X', duration: 600, scale: 0.96, perspective: '1400px', ...flipOptions });

  // Détecte si le gradient ou la couleur contient déjà une transparence (rgba/hsla ou gradient avec alpha)
  const hasAlpha = (str) => typeof str === 'string' && (/rgba\s*\(|hsla\s*\(/.test(str) || /,\s*0\.[0-9]+\)/.test(str));

  let bg;
  if (gradient) {
    if (hasAlpha(gradient)) {
      bg = gradient; // déjà transparent, on ne touche pas
    } else if (glass) {
      // applique l'effet glassmorphism (ajoute alpha à la fin de chaque couleur hex ou rgb)
      // Cas simple : linear-gradient(120deg, #181828 0%, #211a2f 100%) => linear-gradient(120deg, #181828b8 0%, #211a2fb8 100%)
      bg = gradient.replace(/(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]*\))/g, (col) => {
        if (col.startsWith('rgb')) return col.replace(')', ',0.72)');
        if (col.length === 7) return col + 'b8'; // #RRGGBB + b8 (72% alpha)
        if (col.length === 4) return col + 'b8'; // #RGB + b8
        return col;
      });
    } else {
      bg = gradient; // opaque, on respecte le choix
    }
  } else if (color) {
    bg = glass ? (hasAlpha(color) ? color : color + 'b8') : color;
  } else {
    bg = glass ? 'rgba(39,29,68,0.72)' : '#271d44';
  }

  // Animation CSS keyframes pour un tour complet
  const axis = (flipOptions.axis || 'X').toUpperCase();
  const cumulative = !!flipOptions.cumulative;



  const handleClick = (e) => {
    if (cumulative) {
      triggerSpin();
    } else {
      triggerFlip();
    }
    if (onClick) onClick(e);
  };
  if (!cube) {
    const btnClass = cumulative
      ? ["flat-btn-3d", className].join(" ")
      : ["flat-btn-3d", flipClass, flipped ? "flipping" : "", className].join(" ");
    return (
      <button
        className={btnClass}
        style={{
          width: "100%",
          maxWidth: 320,
          margin: "0 auto",
          padding: "12px 0",
          borderRadius: radius,
          background: bg,
          color: textColor,
          border: "none",
          fontWeight,
          fontSize,
          cursor: "pointer",
          boxShadow: shadow,
          outline: "none",
          position: "relative",
          backdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
          WebkitBackdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
          ...style
        }}
        onClick={handleClick}
        {...props}
      >
        <span
          className="flat-btn-3d-inner flat-btn-3d-face front"
          style={{
            position: "relative",
            zIndex: 2,
            background: bg,
            color: textColor,
            borderRadius: radius,
            width: "100%",
            minHeight: 32,
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight,
            fontSize,
            boxShadow: shadow,
            backdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
            WebkitBackdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
            ...(cumulative ? spinStyle : {})
          }}
        >
          {children}
        </span>
        {!cumulative && (
          <span className="flat-btn-3d-inner flat-btn-3d-face back" style={{
            zIndex: 1,
            background: bg,
            color: textColor,
            borderRadius: radius,
            width: "100%",
            minHeight: 32,
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight,
            fontSize,
            boxShadow: shadow,
            backdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
            WebkitBackdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
          }}>{children}</span>
        )}
      </button>
    );
  }

  // Mode RectCubeButton : faces latérales visibles pendant le flip
  // Génère les styles dynamiquement
  const cubeFaceStyle = (face) => {
    // Face principale : couleur normale
    if (face === "front") {
      return {
        background: cubeColors[face] || bg,
        borderRadius: radius,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
        fontWeight,
        fontSize,
        boxShadow: shadow,
        padding: "0 18px",
        backfaceVisibility: "hidden",
        zIndex: 1,
        backdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
        WebkitBackdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
      };
    }
    // Autres faces : effet fondu (dégradé ou opacité)
    let baseColor = cubeColors[face] || bg;
    // Si c'est un gradient, on ajoute un overlay noir semi-transparent
    let backgroundFade = baseColor;
    if (baseColor.startsWith('linear-gradient') || baseColor.startsWith('radial-gradient')) {
      backgroundFade = `${baseColor}, linear-gradient(0deg,rgba(0,0,0,0.22),rgba(0,0,0,0.38))`;
    } else {
      // Si couleur simple, on applique une opacité/fondu
      backgroundFade = `linear-gradient(0deg,rgba(0,0,0,0.22),rgba(0,0,0,0.38)), ${baseColor}`;
    }
    return {
      background: backgroundFade,
      borderRadius: radius,
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: textColor,
      fontWeight,
      fontSize,
      boxShadow: shadow,
      padding: "0 18px",
      backfaceVisibility: "hidden",
      zIndex: 1,
      backdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
      WebkitBackdropFilter: glass ? 'blur(12px) saturate(1.25)' : undefined,
    };
  };

  const depth = typeof cubeDepth === "number" ? `${cubeDepth}px` : cubeDepth;

  // --- RETURN pour le mode cube ---
  return (
    <div
      className={cumulative
        ? ["flat-btn-3d", className].join(" ")
        : ["flat-btn-3d", flipClass, flipped ? "flipping" : "", className].join(" ")}
      style={{
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
        height: 48,
        borderRadius: radius,
        background: "none",
        position: "relative",
        perspective: flipOptions.perspective || '800px',
        ...style
      }}
      onClick={handleClick}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: radius,
          ...spinStyle
        }}
      >
        {/* Face avant */}
        <div className="flat-btn-3d-face front" style={{ ...cubeFaceStyle("front"), transform: `translateZ(${depth})` }}>{children}</div>
        {/* Face arrière masquée en mode cumulative */}
        {!cumulative && (
          <div className="flat-btn-3d-face back" style={{ ...cubeFaceStyle("back"), transform: `rotateX(180deg) translateZ(${depth})` }}>{children}</div>
        )}
        {/* Faces latérales */}
        <div className="flat-btn-3d-face left" style={{ ...cubeFaceStyle("left"), transform: `rotateY(-90deg) translateZ(${depth})` }}></div>
        <div className="flat-btn-3d-face right" style={{ ...cubeFaceStyle("right"), transform: `rotateY(90deg) translateZ(${depth})` }}></div>
        <div className="flat-btn-3d-face top" style={{ ...cubeFaceStyle("top"), transform: `rotateX(90deg) translateZ(${depth})` }}></div>
        <div className="flat-btn-3d-face bottom" style={{ ...cubeFaceStyle("bottom"), transform: `rotateX(-90deg) translateZ(${depth})` }}></div>
      </div>
    </div>
  );
}

FlatButton3D.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  textColor: PropTypes.string,
  gradient: PropTypes.string,
  radius: PropTypes.number,
  shadow: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  flipOptions: PropTypes.object,
};
