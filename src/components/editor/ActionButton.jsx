import React from "react";

// Ajout du style global pour l'animation cube 3D
const flipStyleId = "action-btn-flip-style";
if (!document.getElementById(flipStyleId)) {
  const style = document.createElement("style");
  style.id = flipStyleId;
  style.innerHTML = `
    .action-btn-cube {
      perspective: 1200px;
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      position: relative;
    }
    .action-btn-cube-inner {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      transition: box-shadow 0.18s, filter 0.18s;
      transform-style: preserve-3d;
      position: relative;
      will-change: transform;
    }
    .action-btn-flip-x .action-btn-cube-inner {
      animation: action-btn-cube-flip-x 0.6s cubic-bezier(.4,2,.3,1);
    }
    @keyframes action-btn-cube-flip-x {
      0% { transform: rotateX(0deg); }
      100% { transform: rotateX(360deg); }
    }
    .action-btn-cube-face {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0; top: 0;
      border-radius: 12px;
      backface-visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 17px;
      z-index: 1;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.2s;
    }
    .action-btn-cube-face.back {
      transform: rotateX(180deg);
      background: #1a1330;
      color: #fff8;
      box-shadow: 0 0 32px 8px #0008 inset;
      z-index: 0;
    }
    /* Masquer la face arrière hors animation */
    .action-btn-cube:not(.action-btn-flip-x) .action-btn-cube-face.back {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);
}

export default function ActionButton({ children, onClick, color = "#10b981", gradientColor = "#3b82f6", style = {}, ...props }) {
  const isThemeViolet = color === "#271d44" && gradientColor === "#3a2a5c";
  const gradient = isThemeViolet
    ? 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)'
    : `linear-gradient(100deg, ${color}, ${gradientColor} 80%, #fff0 100%)`;
  const [pressed, setPressed] = React.useState(false);
  const [flip, setFlip] = React.useState(false);


  // Lance une animation de flip 360° sur l'axe X
  const handleClick = (e) => {
    console.log('[ActionButton] CLICK', { flip, pressed });
    if (onClick) onClick(e);
    setFlip(false); // reset pour relancer l'animation si double clic rapide
    setTimeout(() => setFlip(true), 10);
    setTimeout(() => setFlip(false), 610);
  };

  React.useEffect(() => {
    console.log('[ActionButton] RENDER', { flip, pressed });
  });

  // Construction dynamique du style pour la face avant
  const faceStyle = {
    background: gradient,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    boxShadow: pressed
      ? `0 2px 12px 0 ${gradientColor}cc, 0 1px 2px #fff8, 0 0 0 2px #fff4`
      : `0 4px 24px 0 ${gradientColor}88, 0 2px 8px #fff4, 0 0 0 2px #fff2`,
    filter: pressed ? "brightness(1.08) saturate(1.2) blur(0.5px)" : "brightness(1.12) saturate(1.3)",
    backdropFilter: "blur(2.5px)",
    WebkitBackdropFilter: "blur(2.5px)",
    opacity: 0.96,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 17,
    cursor: "pointer",
    ...style
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={["action-btn-cube", flip ? "action-btn-flip-x" : ""].join(" ")}
      style={{
        padding: 0,
        border: "none",
        background: "none",
        width: "100%",
        height: 48,
        borderRadius: 12,
        outline: "none",
        position: "relative",
        ...style
      }}
      {...props}
    >
      <div className="action-btn-cube-inner" style={{ width: "100%", height: "100%", borderRadius: 12, position: "relative" }}>
        <div className="action-btn-cube-face front" style={faceStyle}>
          {children}
        </div>
        <div className="action-btn-cube-face back">
          {/* Face arrière du cube, personnalisable */}
          {children}
        </div>
      </div>
    </button>
  );
}
