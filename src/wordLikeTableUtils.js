// Script avancé pour appliquer un style "Word-like" sur les tableaux Tiptap
// Applique taille, police, couleur, fond, alignement, padding, bordures, sélection, hover, etc.
// À appeler dans un useEffect après chaque update de l'éditeur

export function applyWordLikeTableStyles({
  selector = '.ProseMirror table',
  cellSelector = '.ProseMirror table td, .ProseMirror table th',
  fontSize = '15px',
  fontFamily = 'Segoe UI, Arial, sans-serif',
  minWidth = '90px',
  minHeight = '34px',
  color = '#23202d',
  backgroundColor = '#fff',
  borderColor = '#d1d5db',
  borderWidth = '1.5px',
  borderRadius = '6px',
  cellPadding = '8px 12px',
  headerBg = '#f3f4f6',
  headerColor = '#23202d',
  hoverBg = '#e0e7ef',
  selectedBg = '#c7d2fe',
  transition = 'background 0.18s, color 0.18s',
} = {}) {
  // Table globale
  document.querySelectorAll(selector).forEach(table => {
    table.style.borderCollapse = 'separate';
    table.style.borderSpacing = '0';
    table.style.width = '100%';
    table.style.margin = '12px 0';
    table.style.fontFamily = fontFamily;
    table.style.fontSize = fontSize;
  });
  // Cellules
  document.querySelectorAll(cellSelector).forEach(cell => {
    cell.style.fontFamily = fontFamily;
    cell.style.fontSize = fontSize;
    cell.style.minWidth = minWidth;
    cell.style.minHeight = minHeight;
    cell.style.color = color;
    cell.style.background = backgroundColor;
    cell.style.border = `${borderWidth} solid ${borderColor}`;
    cell.style.borderRadius = borderRadius;
    cell.style.padding = cellPadding;
    cell.style.transition = transition;
    // Header
    if (cell.tagName === 'TH') {
      cell.style.background = headerBg;
      cell.style.color = headerColor;
      cell.style.fontWeight = '700';
      cell.style.textAlign = 'center';
    } else {
      cell.style.textAlign = 'left';
    }
    // Sélection (Tiptap ajoute .selected)
    if (cell.classList.contains('selected')) {
      cell.style.background = selectedBg;
    }
  });
  // Hover (via JS car pas de CSS scoped possible ici)
  document.querySelectorAll(cellSelector).forEach(cell => {
    cell.addEventListener('mouseenter', function onEnter() {
      if (!cell.classList.contains('selected')) cell.style.background = hoverBg;
    });
    cell.addEventListener('mouseleave', function onLeave() {
      if (!cell.classList.contains('selected')) cell.style.background = cell.tagName === 'TH' ? headerBg : backgroundColor;
    });
  });
}
