
// Composant centralisé, délègue tout aux sous-composants atomiques
export default function EditorPanel(props) {
  const { editMode, isAuthenticated, editingSubId, addingSubToCatId, theme } = props;
  // Ajout d'une fonction utilitaire pour normaliser les sauts de ligne
  function normalizeLineBreaks(str) {
    if (typeof str !== 'string') return str;
    // Remplace les retours Windows/Mac par des \n
    return str.replace(/\r\n|\r/g, '\n');
  }
  if (!editMode || !isAuthenticated) return null;
  return (
      <div style={{
      background: theme?.bg || "#f8fafc",
      border: `2px solid ${theme?.accent1 || "#f59e42"}`,
      borderRadius: 18,
      padding: 32,
      marginBottom: 0,
      boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
      maxWidth: 1400,
        marginLeft: 0,
        marginRight: 0,
      position: "relative",
      height: '100%',
      minHeight: 0,
      display: 'Sflex',
      flexDirection: 'column',
      overflow: 'auto',
    }}>
      <h2 style={{ color: theme?.accent1 || "#f59e42", margin: 0, fontWeight: 800, fontSize: 24, letterSpacing: 0.2 }}>Mode édition centralisé</h2>
      {/* Bloc de déplacement de sous-catégorie */}
      {editingSubId && (
        <div style={{
          margin: "32px 0 0 0",
          background: theme?.panel || "#fff",
          borderRadius: 16,
          padding: "32px 24px 24px 24px",
          border: `1.5px solid ${theme?.border || "#f59e42"}`,
          boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
          minWidth: 320,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 26, color: theme?.accent1 || "#f59e42", fontWeight: 700, marginRight: 6 }}>⇄</span>
            <span style={{ color: theme?.accent1 || "#f59e42", fontWeight: 700, fontSize: 20 }}>Déplacer ce module dans une autre catégorie</span>
          </div>
          <style>{`
            select {
              background: linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%) !important;
              color: #fff !important;
              box-shadow: 0 2px 8px 0 rgba(80,60,120,0.10);
            }
            select option {
              background: rgba(40,34,60,0.98) !important;
              color: #fff !important;
            }
            select:focus {
              outline: 2px solid ${theme?.accent1 || '#f59e42'} !important;
            }
          `}</style>
          <select
            value={props.categories.find(cat => cat.subs.some(sub => sub.id === editingSubId))?.id || ''}
            onChange={e => props.moveSubToCategory(editingSubId, Number(e.target.value))}
            style={{
              fontSize: 18,
              padding: '12px 18px',
              borderRadius: 10,
              border: `1.5px solid ${theme?.border || "#f59e42"}`,
              background: 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px 0 rgba(80,60,120,0.10)',
              marginBottom: 10
            }}
          >
            <option value="">Choisir une catégorie...</option>
            {props.categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
      )}
        {editingSubId && <ModuleEditForm {...props} normalizeLineBreaks={normalizeLineBreaks} />}
      {addingSubToCatId && <ModuleAddForm {...props} />}
      {/* Bouton 'Quitter le mode édition' supprimé */}
    </div>
  );
}
import React from "react";
import CategoryForm from "./editor/CategoryForm";
import ModuleEditForm from "./editor/ModuleEditForm";
import ModuleAddForm from "./editor/ModuleAddForm";
import TextInput from "./editor/TextInput";
import ColorInput from "./editor/ColorInput";
import SelectInput from "./editor/SelectInput";
import ActionButton from "./editor/ActionButton";
import PanelTitle from "./editor/PanelTitle";
import TiptapEditor from "./editor/TiptapEditor";
import TableEditorModal from "./editor/TableEditorModal";
import "../AppTiptap.css";


function TiptapMenuBar({ editor, theme, highlightColor, setHighlightColor }) {
  if (!editor) return null;
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];
  const colors = ['#000000', '#e11d48', '#f59e42', '#10b981', '#3b82f6', '#8b5cf6', '#fbbf24', '#f3f4f6', '#ffffff'];
  // Couleurs pour les cellules
  const cellColors = ['#fff', '#f59e42', '#10b981', '#3b82f6', '#e11d48', '#fbbf24', '#23202d'];
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      marginBottom: 18,
      background: theme?.panel || '#23202d',
      borderRadius: 14,
      padding: '14px 18px',
      border: `2.5px solid ${theme?.accent1 || '#f59e42'}`,
      alignItems: 'center',
      boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
      fontSize: 18,
    }}>
      <button title="Gras" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} style={toolBtnStyle}><FaBold /></button>
      <button title="Italique" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} style={toolBtnStyle}><FaItalic /></button>
      <button title="Souligné" onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} style={toolBtnStyle}><FaUnderline /></button>
      {/* Surligneur interactif synchronisé */}
      {/* Surligneur custom avec palette de couleurs */}
      <div title="Surligner" style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
        {["#fbbf24", "#10b981", "#3b82f6", "#e11d48", "#f59e42", "#a78bfa", "#fff200", "#23202d"].map(c => (
          <button
            key={c}
            onClick={() => {
              setHighlightColor(c);
              editor.chain().focus().unsetHighlight().setHighlight({ color: c }).run();
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              border: highlightColor === c ? '2.5px solid #f59e42' : '1.5px solid #888',
              background: c,
              margin: 1,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: highlightColor === c ? '0 0 0 2px #fff, 0 0 8px #f59e42' : 'none',
            }}
            title={`Surligner en ${c}`}
          >
            {/* Icône maison : un petit rectangle */}
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="2" y="7" width="12" height="5" rx="2" fill={c} stroke="#23202d" strokeWidth="1.2" />
            </svg>
          </button>
        ))}
        <input
          type="color"
          value={highlightColor}
          title="Autre couleur surligneur"
          style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', marginLeft: 2 }}
          onChange={e => {
            setHighlightColor(e.target.value);
            editor.chain().focus().unsetHighlight().setHighlight({ color: e.target.value }).run();
          }}
        />
      </div>
      <div title="Couleur texte" style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
        <FaPalette style={{ fontSize: 18, marginRight: 2 }} />
        {colors.map(c => (
          <button key={c} onClick={() => editor.chain().focus().setColor(c).run()} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '1.5px solid #888', margin: 1, cursor: 'pointer' }} />
        ))}
        <input type="color" onChange={e => editor.chain().focus().setColor(e.target.value).run()} title="Autre couleur" style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', marginLeft: 2 }} />
      </div>
      <div title="Taille texte" style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
        <FaTextHeight style={{ fontSize: 18, marginRight: 2 }} />
        <select
          value={
            (() => {
              const attr = editor.getAttributes('fontSize');
              if (!attr) return '';
              if (typeof attr === 'string') return attr.replace('px', '');
              if (typeof attr === 'object' && attr.fontSize) return String(attr.fontSize).replace('px', '');
              return '';
            })()
          }
          onChange={e => editor.chain().focus().setFontSize(e.target.value + 'px').run()}
          style={{ borderRadius: 8, padding: '4px 10px', fontSize: 16, marginLeft: 2 }}
        >
          <option value="">Taille</option>
          {fontSizes.map(s => <option key={s} value={s}>{s}px</option>)}
        </select>
      </div>
      <button title="Liste à puces" onClick={() => editor.chain().focus().toggleBulletList().run()} style={toolBtnStyle}><FaListUl /></button>
      <button title="Liste numérotée" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={toolBtnStyle}><FaListOl /></button>
      <button title="Titre" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={toolBtnStyle}><FaHeading /></button>
      <button title="Paragraphe" onClick={() => editor.chain().focus().setParagraph().run()} style={toolBtnStyle}><FaParagraph /></button>
      <button title="HR" onClick={() => editor.chain().focus().setHorizontalRule().run()} style={toolBtnStyle}>HR</button>
      <button title="Annuler" onClick={() => editor.chain().focus().undo().run()} style={toolBtnStyle}><FaUndo /></button>
      <button title="Rétablir" onClick={() => editor.chain().focus().redo().run()} style={toolBtnStyle}><FaRedo /></button>
      {/* <button title="Image" onClick={() => {
        const url = window.prompt('URL de l\'image');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }} style={toolBtnStyle}><FaImage /></button> */}
      <button title="Tableau" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} style={toolBtnStyle}><FaTable /></button>
      {/* Les boutons +Colonne/+Ligne sont maintenant contextuels et discrets, plus dans la barre d'outils */}
      <button title="Supprimer Table" onClick={() => editor.chain().focus().deleteTable().run()} style={toolBtnStyle}><FaTrash /></button>
      {/* <button title="Supprimer colonne" onClick={() => editor.chain().focus().deleteColumn().run()} style={toolBtnStyle}>-Col</button> */}
      {/* <button title="Supprimer ligne" onClick={() => editor.chain().focus().deleteRow().run()} style={toolBtnStyle}>-Ligne</button> */}
    </div>
  );
}

const toolBtnStyle = {
  padding: '4px 7px',
  borderRadius: 7,
  border: 'none',
  background: '#181c24',
  color: '#f3f4f6',
  fontSize: 15,
  cursor: 'pointer',
  margin: '0 1px',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  minWidth: 0,
};

function isProbablyHtml(str) {
  return /<\s*(p|ul|ol|li|table|tr|td|th|h[1-6]|img|br)[^>]*>/i.test(str);
}

function forceParagraphsHtml(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html || '';
  const text = tempDiv.innerText;
  // Remplace les doubles retours à la ligne par un marqueur spécial
  let withMarkers = text.replace(/\n\n+/g, '\n__DOUBLE_BREAK__\n');
  // Sépare en lignes et recompose en paragraphes
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
