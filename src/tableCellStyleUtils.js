// Script utilitaire pour forcer le style des cellules de tableau Tiptap
// Usage : importer et appeler applyTableCellStyles() dans un useEffect de l'éditeur

export function applyTableCellStyles({
  selector = '.ProseMirror table td, .ProseMirror table th',
  fontSize = '15px',
  fontFamily = 'Arial, sans-serif',
  minWidth = '80px',
  minHeight = '32px',
  color = '#222',
  backgroundColor = null // si null, ne force pas
} = {}) {
  const cells = document.querySelectorAll(selector);
  cells.forEach(cell => {
    cell.style.fontSize = fontSize;
    cell.style.fontFamily = fontFamily;
    cell.style.minWidth = minWidth;
    cell.style.minHeight = minHeight;
    cell.style.color = color;
    if (backgroundColor) {
      cell.style.backgroundColor = backgroundColor;
    }
  });
}
