// scrollbarStyle.js
// Générateur de style de scrollbar personnalisée, 100% configurable
// Utilisable partout (tableaux, listes, modals, etc.)

/**
 * getCustomScrollbarClass
 * Génère une classe CSS pour une scrollbar custom, à appliquer sur n'importe quel conteneur scrollable.
 * @param {object} options
 *   - width: largeur de la barre (ex: '8px')
 *   - trackColor: couleur du fond
 *   - thumbColor: couleur du thumb
 *   - thumbHover: couleur du thumb au hover
 *   - radius: border-radius du thumb
 *   - minHeight: taille min du thumb
 *   - border: bordure du thumb
 *   - zIndex: z-index de la barre
 * @returns {string} className à appliquer
 */
export function getCustomScrollbarClass(options = {}) {
  const {
    width = '8px',
    trackColor = '#1a1330',
    thumbColor = '#3a2a5c',
    thumbHover = '#6d4aff',
    radius = '8px',
    minHeight = '32px',
    border = 'none',
    zIndex = 1,
  } = options;
  const className = `scrollbar-custom-${width}-${trackColor}-${thumbColor}-${radius}`.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!document.getElementById(className)) {
    const style = document.createElement('style');
    style.id = className;
    style.innerHTML = `
      .${className} {
        scrollbar-width: thin;
        scrollbar-color: ${thumbColor} ${trackColor};
        position: relative;
        z-index: ${zIndex};
      }
      .${className}::-webkit-scrollbar {
        width: ${width};
        background: ${trackColor};
        border-radius: ${radius};
      }
      .${className}::-webkit-scrollbar-thumb {
        background: ${thumbColor};
        border-radius: ${radius};
        min-height: ${minHeight};
        border: ${border};
      }
      .${className}::-webkit-scrollbar-thumb:hover {
        background: ${thumbHover};
      }
      .${className}::-webkit-scrollbar-corner {
        background: ${trackColor};
      }
    `;
    document.head.appendChild(style);
  }
  return className;
}

// Exemple d'utilisation :
// const scrollClass = getCustomScrollbarClass({ width: '10px', thumbColor: '#ff0', radius: '12px' });
// <div className={scrollClass} style={{overflow: 'auto', maxHeight: 300}}> ... </div>
