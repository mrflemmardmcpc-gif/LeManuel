// useSpin3D.js
// Hook React pour appliquer une animation 3D de rotation personnalisable sur n'importe quel composant
import { useState, useCallback } from "react";
import "./spin3D.css";

/**
 * useSpin3D
 * @param {object} options
 *   - axis: 'X' | 'Y' (axe de rotation)
 *   - duration: durée de l'animation en ms (default: 600)
 *   - easing: fonction d'easing CSS (default: cubic-bezier(.4,2,.3,1))
 * @returns [spinStyle, triggerSpin, spinning]
 */
export function useSpin3D({ axis = 'X', duration = 600, easing = 'cubic-bezier(.4,2,.3,1)', perspective = '1000px' } = {}) {
  const [spinning, setSpinning] = useState(false);
  const animName = axis === 'Y' ? 'spinY360' : 'spinX360';
  const base3D = {
    perspective,
    transformStyle: 'preserve-3d',
  };
  const spinStyle = spinning
    ? { ...base3D, animation: `${animName} ${duration}ms ${easing}` }
    : { ...base3D, transform: axis === 'Y' ? 'rotateY(0deg)' : 'rotateX(0deg)', transition: 'none' };
  const triggerSpin = useCallback(() => {
    if (!spinning) setSpinning(true);
  }, [spinning]);
  // Reset après anim
  if (spinning) setTimeout(() => setSpinning(false), duration);
  return [spinStyle, triggerSpin, spinning];
}
