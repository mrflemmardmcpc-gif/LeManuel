import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function CubeButton3D({
  width = 220,
  height = 64,
  depth = 32,
  faces = {}, // { front, back, left, right, top, bottom } : couleurs ou contenu JSX
  borderColor = "#fff4",
  borderRadius = 12,
  rotationDuration = 600, // en ms
  rotationAxis = "X", // 'X' ou 'Y'
  rotationDirection = 1, // 1 ou -1
  onClick,
  style = {},
  className = "",
  animate = true,
  children,
  ...props
}) {

  // Ajout du style global pour animation et cube 3D
  useEffect(() => {
    const id = "cube-btn-3d-style";
    if (!document.getElementById(id)) {
      const styleTag = document.createElement("style");
      styleTag.id = id;
      styleTag.innerHTML = `
        .cube-btn-3d {
          display: inline-block;
          position: relative;
          cursor: pointer;
          outline: none;
          border: none;
          background: none;
          padding: 0;
        }
        .cube-btn-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform ${rotationDuration}ms cubic-bezier(.4,2,.3,1);
          border-radius: var(--cube-border-radius, 12px);
        }
        .cube-btn-face {
          box-shadow: 0 4px 24px 0 #0004;
          user-select: none;
          position: absolute;
          left: 0;
          top: 0;
          border: 2px solid var(--cube-border-color, #fff4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          /* backface-visibility: hidden; */
          box-sizing: border-box;
          border-radius: var(--cube-border-radius, 12px);
          overflow: hidden;
        }
        /* Faces positionnées selon la géométrie standard d'un cube/parallélépipède */
        .cube-btn-face.front  { transform: translateZ(calc(var(--cube-depth) / 2)); }
        .cube-btn-face.back   { transform: rotateY(180deg) translateZ(calc(var(--cube-depth) / 2)); }
        .cube-btn-face.left   { transform: rotateY(-90deg) translateZ(calc(var(--cube-width) / 2)); }
        .cube-btn-face.right  { transform: rotateY(90deg) translateZ(calc(var(--cube-width) / 2)); }
        .cube-btn-face.top    { transform: rotateX(90deg) translateZ(calc(var(--cube-height) / 2)); }
        .cube-btn-face.bottom { transform: rotateX(-90deg) translateZ(calc(var(--cube-height) / 2)); }
        .rotate-360-x {
          animation: rotateX360 var(--rotation-duration)ms forwards cubic-bezier(.4,2,.3,1);
        }
        .rotate-360-y {
          animation: rotateY360 var(--rotation-duration)ms forwards cubic-bezier(.4,2,.3,1);
        }
        @keyframes rotateX360 {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(calc(360deg * var(--rotation-direction))); }
        }
        @keyframes rotateY360 {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(calc(360deg * var(--rotation-direction))); }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, [rotationDuration]);

  // Dimensions CSS
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;
  let d;
  if (typeof depth === "number") {
    d = `${depth}px`;
  } else if (depth) {
    d = depth;
  } else {
    // Si pas de profondeur explicite, on prend la plus petite dimension
    const numW = parseInt(w);
    const numH = parseInt(h);
    d = `${Math.min(numW, numH)}px`;
  }


  // Style des faces selon la face
  function getFaceStyle(face) {
    let style = {};
    if (face === 'front' || face === 'back') {
      style.width = w;
      style.height = h;
    } else if (face === 'left' || face === 'right') {
      style.width = d;
      style.height = h;
    } else if (face === 'top' || face === 'bottom') {
      style.width = w;
      style.height = d;
    }
    style.background = faces[face]?.background || faces[face]?.color || "#271d44";
    style.color = faces[face]?.textColor || "#fff";
    style.borderRadius = borderRadius;
    Object.assign(style, faces[face]?.style);
    return style;
  }

  // Suppression des logs de debug
  return (
    <button
      className={["cube-btn-3d", className].join(" ")}
      style={{
        '--cube-width': w,
        '--cube-height': h,
        '--cube-depth': d,
        '--cube-border-color': borderColor,
        '--cube-border-radius': `${borderRadius}px`,
        width: w,
        height: h,
        // On retire le style de rotation ici
        ...(() => {
          const { transition, transform, ...rest } = style || {};
          return rest;
        })(),
      }}
      onClick={onClick}
      {...props}
    >
      <div
        className="cube-btn-inner rotate3d-preserve"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: `var(--cube-border-radius, 12px)`,
          // Appliquer le style de rotation ici
          ...(style || {}),
        }}
      >
        <div className="cube-btn-face front" style={getFaceStyle("front")}>{faces.front?.content ?? faces.front ?? children}</div>
        <div className="cube-btn-face back" style={getFaceStyle("back")}>{faces.back?.content ?? faces.back ?? ""}</div>
        <div className="cube-btn-face left" style={getFaceStyle("left")}>{faces.left?.content ?? faces.left ?? ""}</div>
        <div className="cube-btn-face right" style={getFaceStyle("right")}>{faces.right?.content ?? faces.right ?? ""}</div>
        <div className="cube-btn-face top" style={getFaceStyle("top")}>{faces.top?.content ?? faces.top ?? ""}</div>
        <div className="cube-btn-face bottom" style={getFaceStyle("bottom")}>{faces.bottom?.content ?? faces.bottom ?? ""}</div>
      </div>
    </button>
  );
}

CubeButton3D.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  depth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  faces: PropTypes.object,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
