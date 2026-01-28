// Ajoute resize Word-like sur les tableaux Tiptap (drag sur coin bas/droite)
// À appeler après chaque update de l'éditeur

export function enableTableResize({
  selector = '.ProseMirror table',
  minWidth = 120,
  maxWidth = 1200,
  minHeight = 60,
  maxHeight = 800,
} = {}) {
  document.querySelectorAll(selector).forEach(table => {
    // Style Word-like général
    table.style.width = table.dataset.userWidth || '';
    table.style.height = table.dataset.userHeight || '';
    table.style.maxWidth = maxWidth + 'px';
    table.style.minWidth = minWidth + 'px';
    table.style.maxHeight = maxHeight + 'px';
    table.style.minHeight = minHeight + 'px';
    table.style.display = 'block';
    table.style.margin = '24px auto';
    table.style.position = 'relative';
    table.style.boxShadow = '0 2px 16px 0 rgba(59,130,246,0.08)';
    table.style.background = '#fff';
    // Ajoute le handle si absent
    if (!table.querySelector('.table-resize-handle')) {
      const handle = document.createElement('div');
      handle.className = 'table-resize-handle';
      handle.style.position = 'absolute';
      handle.style.right = '-14px';
      handle.style.bottom = '-14px';
      handle.style.width = '28px';
      handle.style.height = '28px';
      handle.style.background = 'linear-gradient(135deg,#3b82f6 60%,#10b981 100%)';
      handle.style.border = '2.5px solid #fff';
      handle.style.boxShadow = '0 2px 8px #3b82f655';
      handle.style.borderRadius = '50%';
      handle.style.cursor = 'nwse-resize';
      handle.style.zIndex = 10;
      handle.style.display = 'flex';
      handle.style.alignItems = 'center';
      handle.style.justifyContent = 'center';
      handle.style.transition = 'background 0.18s';
      handle.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 14h10V4" stroke="#fff" stroke-width="2.5" fill="none"/></svg>';
      table.appendChild(handle);
      let startX, startY, startW, startH;
      handle.addEventListener('mousedown', e => {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        startW = table.offsetWidth;
        startH = table.offsetHeight;
        document.body.style.userSelect = 'none';
        function onMove(ev) {
          let newW = Math.max(minWidth, Math.min(maxWidth, startW + (ev.clientX - startX)));
          let newH = Math.max(minHeight, Math.min(maxHeight, startH + (ev.clientY - startY)));
          table.style.width = newW + 'px';
          table.style.height = newH + 'px';
          table.dataset.userWidth = newW + 'px';
          table.dataset.userHeight = newH + 'px';
        }
        function onUp() {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          document.body.style.userSelect = '';
        }
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
    }
    // Style Word-like sur cellules
    table.querySelectorAll('td,th').forEach(cell => {
      cell.style.fontFamily = 'Segoe UI, Arial, sans-serif';
      cell.style.fontSize = '15px';
      cell.style.color = '#23202d';
      cell.style.background = cell.tagName === 'TH' ? '#f3f4f6' : '#fff';
      cell.style.border = '1.5px solid #d1d5db';
      cell.style.borderRadius = '6px';
      cell.style.padding = '10px 16px';
      cell.style.textAlign = cell.tagName === 'TH' ? 'center' : 'left';
      cell.style.transition = 'background 0.18s, color 0.18s';
    });
  });
}
