// Animation et logique de switch spiral color picker, réutilisable
// Peut être importé dans n'importe quel composant

import React from "react";

/**
 * useSpiralSwitch
 * @param {number} initial - index actif initial (0 ou 1)
 * @param {object} options - options de personnalisation
 *   - duration: durée de l’animation (ms)
 *   - blur: intensité du flou (ex: "2px")
 *   - scale: scale de l’inactif (ex: 0.92)
 *   - rotate: rotation de l’inactif (ex: -8)
 *   - skew: skewY de l’inactif (ex: -2)
 *   - easing: fonction d’easing CSS
 */
export function useSpiralSwitch(initial = 0, options = {}) {
  const {
    duration = 350,
    blur = "2px",
    scale = 0.92,
    rotate = -8,
    skew = -2,
    easing = "cubic-bezier(.7,1.7,.5,1)"
  } = options;
  const [active, setActive] = React.useState(initial);
  const [switching, setSwitching] = React.useState(false);

  const triggerSwitch = () => {
    setSwitching(true);
    setTimeout(() => {
      setActive((a) => 1 - a);
      setSwitching(false);
    }, duration);
  };

  // Génère dynamiquement le style CSS à importer dans le composant parent
  const spiralSwitchClass = React.useMemo(() => {
    const className = `spiral-switch-anim-${duration}-${blur}-${scale}-${rotate}-${skew}`.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!document.getElementById(className)) {
      const style = document.createElement("style");
      style.id = className;
      style.innerHTML = `
        .${className} {
          transition: transform ${duration}ms ${easing}, filter ${Math.round(duration*0.7)}ms;
          will-change: transform, filter;
        }
        .${className}.inactive {
          filter: blur(${blur}) grayscale(0.5) brightness(0.7);
          transform: scale(${scale}) rotate(${rotate}deg) skewY(${skew}deg);
          z-index: 1;
        }
        .${className}.active {
          filter: none;
          transform: scale(1) rotate(0deg) skewY(0deg);
          z-index: 2;
        }
      `;
      document.head.appendChild(style);
    }
    return className;
  }, [duration, blur, scale, rotate, skew, easing]);

  return { active, switching, triggerSwitch, spiralSwitchClass };
}

// CSS à importer dans le composant parent :
// .spiral-switch-anim {
//   transition: transform 0.35s cubic-bezier(.7,1.7,.5,1), filter 0.25s;
//   will-change: transform, filter;
// }
// .spiral-switch-anim.inactive {
//   filter: blur(2px) grayscale(0.5) brightness(0.7);
//   transform: scale(0.92) rotate(-8deg) skewY(-2deg);
//   z-index: 1;
// }
// .spiral-switch-anim.active {
//   filter: none;
//   transform: scale(1) rotate(0deg) skewY(0deg);
//   z-index: 2;
// }
