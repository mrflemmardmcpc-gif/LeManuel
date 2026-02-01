
import React, { useRef, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FontSize from "./FontSizeExtension";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import TiptapToolbar from "./TiptapToolbar";
import TableContextMenu from "./TableContextMenu";
import TableHandleButtons from "./TableHandleButtons";

// Dummy extensions for custom table header/cell if needed
const CustomTableHeader = TableRow;
const CustomTableCell = TableRow;

function isProbablyHtml(str) {
  return /<\s*(p|ul|ol|li|table|tr|td|th|h[1-6]|img|br)[^>]*>/i.test(str);
}
function forceParagraphsHtml(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html || '';
  const text = tempDiv.innerText;
  let withMarkers = text.replace(/\n\n+/g, '\n__DOUBLE_BREAK__\n');
  return withMarkers.split(/\r?\n/).map(line => {
    if (line === '__DOUBLE_BREAK__') {
      return '<p></p>';
    } else if (/^\s*([*-+]|\d+\.)\s/.test(line) || /^\s*#/.test(line) || line.trim() === '') {
      return line;
    } else {
      return `<p>${line.trim()}</p>`;
    }
  }).join('');
}

export default function TiptapEditor({
  value,
  onChange,
  darkMode,
  theme,
  setEditorInstance,
  highlightColor,
  setHighlightColor
}) {
  const [showTableHandles, setShowTableHandles] = useState(false);
  const [tablePos, setTablePos] = useState(null);
  const editorContentRef = useRef();
  const [tableCoords, setTableCoords] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, cellPos: null });
  const contextMenuRef = useRef();
  const didInit = useRef(false);

  // Editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Color,
      TextStyle,
      FontSize,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Image,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `background: ${darkMode ? '#181c24' : '#f8fafc'}; color: ${darkMode ? '#f3f4f6' : '#181c24'}; border-radius: 12px; min-height: 180px; font-size: 1.05rem; border: 1.5px solid ${theme?.accent1 || '#f59e42'}; padding-left: 8px; padding-top: 8px;`,
      },
      handlePaste(view, event, slice) {
        const text = event.clipboardData?.getData('text/plain');
        if (text) {
          const html = forceParagraphsHtml(text);
          editor.commands.insertContent(html);
          event.preventDefault();
          return true;
        }
        return false;
      },
      handleKeyDown(view, event) {
        // Table deletion logic (see original)
        // ... (omitted for brevity, can be modularized further)
        return false;
      },
    },
  });

  // Table handle visibility
  useEffect(() => {
    if (!editor) return;
    const { state } = editor;
    const { selection } = state;
    let found = false;
    let tPos = null;
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (node.type && node.type.name === 'table' && !found) {
        found = true;
        tPos = pos;
      }
    });
    setShowTableHandles(found);
    setTablePos(tPos);
  }, [editor && editor.state && editor.state.selection, editor]);

  useEffect(() => {
    if (!showTableHandles || tablePos == null || !editorContentRef.current || !editor) {
      setTableCoords(null);
      return;
    }
    const dom = editor.view.domAtPos ? editor.view.domAtPos(tablePos) : null;
    let tableEl = null;
    if (dom && dom.node) {
      if (dom.node.nodeType === 1 && dom.node.tagName === 'TABLE') {
        tableEl = dom.node;
      } else if (dom.node.nodeType === 1) {
        tableEl = dom.node.querySelector('table');
      }
    }
    if (tableEl) {
      const rect = tableEl.getBoundingClientRect();
      setTableCoords({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      });
    } else {
      setTableCoords(null);
    }
  }, [showTableHandles, tablePos, editor && editor.view && editor.view.state]);

  // Initial content load
  useEffect(() => {
    if (editor && value && !didInit.current) {
      let cleanHtml = isProbablyHtml(value) ? value : forceParagraphsHtml(value);
      editor.commands.setContent(cleanHtml, false);
      didInit.current = true;
    }
  }, [value, editor]);

  useEffect(() => {
    if (editor && setEditorInstance) setEditorInstance(editor);
  }, [editor, setEditorInstance]);

  // Context menu logic
  useEffect(() => {
    const handler = (e) => {
      if (contextMenu.visible && contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [contextMenu]);

  function handleContextMenu(event) {
    if (!editor) return;
    const pos = editor.view.posAtCoords({ left: event.clientX, top: event.clientY });
    if (!pos) return;
    let found = false;
    let cellNodePos = null;
    editor.state.doc.nodesBetween(pos.pos, pos.pos, (node, nodePos) => {
      if ((node.type.name === 'tableCell' || node.type.name === 'tableHeader') && !found) {
        cellNodePos = nodePos;
        found = true;
      }
      if (node.type.name === 'tableRow' && !found) {
        if (node.childCount > 0) {
          cellNodePos = nodePos + 1;
          found = true;
        }
      }
    });
    if (found && cellNodePos != null) {
      setContextMenu({ visible: true, x: event.clientX, y: event.clientY, cellPos: cellNodePos });
      event.preventDefault();
    }
  }

  // Table context menu actions
  function handleDeleteCell() {
    if (!editor || contextMenu.cellPos == null) return;
    const { state } = editor;
    let tr = state.tr;
    const node = state.doc.nodeAt(contextMenu.cellPos);
    if (node && (node.type.name === 'tableCell' || node.type.name === 'tableHeader')) {
      tr = tr.replaceWith(contextMenu.cellPos, contextMenu.cellPos + node.nodeSize, state.schema.nodes.tableCell.createAndFill());
      if (tr.docChanged) editor.view.dispatch(tr);
    }
    setContextMenu({ ...contextMenu, visible: false });
  }
  function handleDeleteRow() {
    if (!editor || contextMenu.cellPos == null) return;
    const { state } = editor;
    let rowPos = null;
    state.doc.nodesBetween(contextMenu.cellPos, contextMenu.cellPos, (node, pos) => {
      if (node.type.name === 'tableRow' && rowPos === null) {
        rowPos = pos;
      }
    });
    if (rowPos !== null && editor.chain) {
      editor.chain().focus().setNodeSelection(rowPos).deleteRow().run();
    }
    setContextMenu({ ...contextMenu, visible: false });
  }
  function handleDeleteColumn() {
    if (!editor || contextMenu.cellPos == null) return;
    if (editor.chain) {
      editor.chain().focus().setNodeSelection(contextMenu.cellPos).deleteColumn().run();
    }
    setContextMenu({ ...contextMenu, visible: false });
  }
  function handleCellToHeader() {
    if (!editor || contextMenu.cellPos == null) return;
    const { state } = editor;
    const node = state.doc.nodeAt(contextMenu.cellPos);
    if (node && node.type.name === 'tableCell') {
      const tableHeaderType = state.schema.nodes.tableHeader;
      const newNode = tableHeaderType.create(node.attrs, node.content, node.marks);
      const tr = state.tr.replaceWith(contextMenu.cellPos, contextMenu.cellPos + node.nodeSize, newNode);
      editor.view.dispatch(tr);
    }
    setContextMenu({ ...contextMenu, visible: false });
  }
  function handleColorCell(color) {
    if (!editor || contextMenu.cellPos == null) return;
    const { state } = editor;
    let tr = state.tr;
    const node = state.doc.nodeAt(contextMenu.cellPos);
    if (node && (node.type.name === 'tableCell' || node.type.name === 'tableHeader')) {
      let style = node.attrs.style || '';
      style = style.replace(/background-color:[^;]+;?/gi, '');
      style = `background-color:${color} !important;${style}`.trim();
      style = style.replace(/;\s*$/, '');
      const newAttrs = { ...node.attrs, style, ['data-ttcolor']: color };
      let newNode;
      if (node.content.size === 0) {
        const paragraph = node.type.schema.nodes.paragraph.create();
        newNode = node.type.create(newAttrs, paragraph, node.marks);
      } else {
        newNode = node.type.create(newAttrs, node.content, node.marks);
      }
      tr = tr.replaceWith(contextMenu.cellPos, contextMenu.cellPos + node.nodeSize, newNode);
      if (tr.docChanged) editor.view.dispatch(tr);
    }
    setContextMenu({ ...contextMenu, visible: false });
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Barre d'édition verticale à l'extérieur du modal, collée au bord gauche de la fenêtre */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 450,
        height: '100vh',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '18px 10px 18px 10px',
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        minWidth: 32,
        maxWidth: 48,
        gap: 10,
      }}>
        <TiptapToolbar editor={editor} theme={theme} highlightColor={highlightColor} setHighlightColor={setHighlightColor} />
      </div>
      <div onContextMenu={handleContextMenu} style={{ minHeight: 180, position: 'relative' }} ref={editorContentRef}>
        <EditorContent editor={editor} />
        <TableHandleButtons
          show={showTableHandles}
          coords={tableCoords}
          onAddColumn={() => editor.chain().focus().addColumnAfter().run()}
          onAddRow={() => editor.chain().focus().addRowAfter().run()}
          theme={theme}
          editorContentRef={editorContentRef}
        />
      </div>
      <TableContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        onDeleteCell={handleDeleteCell}
        onDeleteRow={handleDeleteRow}
        onDeleteColumn={handleDeleteColumn}
        onCellToHeader={handleCellToHeader}
        onColorCell={handleColorCell}
        theme={theme}
      />
    </div>
  );
}
