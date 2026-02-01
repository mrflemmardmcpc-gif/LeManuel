import { useState, useCallback } from "react";

/**
 * Hook d'animation de rotation 3D réutilisable
 * @param {Object} options
 * @param {string} options.axis 'X' ou 'Y'
 * @param {number} options.duration en ms
 * @param {number} options.direction 1 ou -1
 * @param {boolean} options.animate true pour activer l'animation
 * @returns {Object} { style, handleClick, isRotating, reset }
 */
export default function useRotate3D({
  axis = "X",
  duration = 600,
  direction = 1,
  animate = true,
} = {}) {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = useCallback((e) => {
    if (animate && !isRotating) {
      setIsRotating(true);
      setRotation((prev) => prev + 360 * direction); // Incrément de 350° au lieu de 360°
    }
  }, [animate, isRotating, direction]);

  // On ne fait que désactiver l'état d'animation, pas de reset ou correction
  const handleTransitionEnd = useCallback(() => {
    setIsRotating(false);
  }, []);

  // On conserve la rotation accumulée, le reset est optionnel et non utilisé automatiquement
  const reset = useCallback(() => {
    setRotation(0);
    setIsRotating(false);
  }, []);

  const style = {
    transition: `transform ${duration}ms cubic-bezier(.4,2,.3,1)`,
    transform:
      axis.toUpperCase() === "Y"
        ? `rotateY(${rotation}deg)`
        : `rotateX(${rotation}deg)`
  };

  return { style, handleClick, handleTransitionEnd, isRotating, reset };
}
