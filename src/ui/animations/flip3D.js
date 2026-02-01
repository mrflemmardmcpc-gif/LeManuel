// flip3D.js
// Animation flip 3D réutilisable et 100% personnalisable (axe, durée, easing, etc.)
// Utilisable pour n'importe quel composant (bouton, carte, etc.)
import { useState, useMemo } from "react";

/**
 * useFlip3D
 * @param {object} options
 *   - axis: 'X' | 'Y' (axe de rotation)
 *   - duration: durée de l'animation (ms)
 *   - easing: fonction d'easing CSS
 *   - perspective: perspective CSS (ex: '900px')
 *   - angle: angle de flip (ex: 360)
 *   - scale: scale pendant le flip (ex: 0.97)
 *   - shadow: box-shadow pendant le flip
 * @returns {object} { flipped, triggerFlip, flipClass }
 */
export function useFlip3D(options = {}) {
  const {
    axis = 'X',
    duration = 600,
    easing = 'cubic-bezier(.4,2,.3,1)',
    perspective = '900px',
    angle = 360,
    scale = 0.97,
    shadow = '0 4px 24px 0 #0004',
  } = options;
  const [flipped, setFlipped] = useState(false);

  const triggerFlip = () => {
    setFlipped(false); // reset pour relancer l'animation
    setTimeout(() => setFlipped(true), 10);
    setTimeout(() => setFlipped(false), duration + 10);
  };

  // Génère dynamiquement la classe CSS pour l'animation
  const flipClass = useMemo(() => {
    const className = `flip3d-anim-${axis}-${duration}-${angle}`.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!document.getElementById(className)) {
      const style = document.createElement("style");
      style.id = className;
      style.innerHTML = `
        .${className}-container {
          perspective: ${perspective};
          display: inline-block;
        }
        .${className} {
          transition: box-shadow 0.18s, filter 0.18s;
          will-change: transform, box-shadow, filter;
        }
        .${className}.flipping {
          animation: ${className}-keyframes ${duration}ms ${easing};
        }
        @keyframes ${className}-keyframes {
          0%   { transform: scale(${scale}) rotate${axis}(0deg); box-shadow: ${shadow}; }
          100% { transform: scale(${scale}) rotate${axis}(${angle}deg); box-shadow: ${shadow}; }
        }
      `;
      document.head.appendChild(style);
    }
    return className;
  }, [axis, duration, angle, scale, shadow, perspective, easing]);

  return { flipped, triggerFlip, flipClass };
}

// Exemple d'utilisation :
// const { flipped, triggerFlip, flipClass } = useFlip3D({ axis: 'X', duration: 600 });
// <div className={`${flipClass}-container`}>
//   <button className={`${flipClass} ${flipped ? 'flipping' : ''}`} onClick={triggerFlip}>Enregistrer</button>
// </div>
