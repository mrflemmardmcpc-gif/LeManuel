
import React from "react";
import Select from "react-select";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaHeading, FaListUl, FaListOl, FaLink, FaImage, FaTable, FaUndo, FaRedo, FaHighlighter, FaQuoteRight, FaCode } from "react-icons/fa";
import { MdFormatColorText } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export default function TiptapToolbar({ editor, theme, highlightColor, setHighlightColor }) {
  if (!editor) return null;
  const colors = ['#000000', '#e11d48', '#f59e42', '#10b981', '#3b82f6', '#8b5cf6', '#fbbf24', '#f3f4f6', '#ffffff'];
  const fontSizeOptions = [
    { value: '', label: 'Taille' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '20', label: '20' },
    { value: '22', label: '22' },
    { value: '24', label: '24' },
    { value: '26', label: '26' },
    { value: '28', label: '28' },
    { value: '32', label: '32' },
    { value: '36', label: '36' },
    { value: '40', label: '40' },
    { value: '48', label: '48' },
    { value: '56', label: '56' },
    { value: '64', label: '64' },
  ];
  const fontSizeValue = fontSizeOptions.find(opt => opt.value === (editor.getAttributes('textStyle').fontSize ? parseInt(editor.getAttributes('textStyle').fontSize).toString() : ''));
  return (
    <div
      style={{
        position: 'fixed',
        left: 335,
        top: 30,
        bottom: 0,
        height: '88vh',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        background: theme?.panel || '#23202d',
        borderRadius: 18,
        padding: '18px 8px',
        border: `2.5px solid ${theme?.accent1 || '#f59e42'}`,
        boxShadow: '2px 0 16px 0 rgba(59,130,246,0.10)',
        fontSize: 22,
        minWidth: 80,
        maxWidth: 110,
        minHeight: 540,
        paddingTop: 22,
        paddingBottom: 22,
      }}
    >
      
      <div style={{ width: '100%', margin: '4px 0', display: 'flex', justifyContent: 'center' }}>
        <Select
          options={fontSizeOptions}
          value={fontSizeValue}
          onChange={opt => {
            const size = opt.value;
            if (size) {
              editor.chain().focus().setMark('textStyle', { fontSize: size + 'px' }).run();
            } else {
              editor.chain().focus().setMark('textStyle', { fontSize: null }).run();
            }
          }}
          isSearchable={false}
          styles={{
            control: (base, state) => ({
              ...base,
              background: theme?.panel || '#23202d',
              color: '#fff',
              borderColor: theme?.accent1 || '#f59e42',
              minHeight: 28,
              boxShadow: state.isFocused ? `0 0 0 1.5px ${theme?.accent1 || '#f59e42'}` : 'none',
            }),
            menu: base => ({
              ...base,
              background: theme?.panel || '#23202d',
              color: '#fff',
              zIndex: 9999,
            }),
            option: (base, state) => ({
              ...base,
              background: state.isSelected ? (theme?.accent1 || '#f59e42') : (state.isFocused ? '#444' : (theme?.panel || '#23202d')),
              color: '#fff',
              cursor: 'pointer',
            }),
            singleValue: base => ({ ...base, color: '#fff' }),
            dropdownIndicator: base => ({ ...base, color: theme?.accent1 || '#f59e42' }),
            indicatorSeparator: base => ({ ...base, background: theme?.accent1 || '#f59e42' }),
            input: base => ({ ...base, color: '#fff' }),
          }}
        />
      </div>

      <button title="Gras" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('bold') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaBold /></button>
      <button title="Italique" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('italic') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaItalic /></button>
      <button title="Souligné" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('underline') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaUnderline /></button>
      <button title="Barré" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('strike') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaStrikethrough /></button>
      <button title="Titre" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('heading', { level: 2 }) ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaHeading /></button>
      <button title="Liste à puces" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('bulletList') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaListUl /></button>
      <button title="Liste numérotée" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} style={{ background: 'none', border: 'none', color: editor.isActive('orderedList') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaListOl /></button>
      <button title="Surligner" onClick={() => editor.chain().focus().toggleHighlight().run()} style={{ background: 'none', border: 'none', color: editor.isActive('highlight') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaHighlighter /></button>
      <label title="Couleur texte" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0 }}>
        <MdFormatColorText style={{ color: editor.getAttributes('textStyle').color || '#fff' }} />
        <input
          type="color"
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            position: 'absolute',
            pointerEvents: 'none',
          }}
          onChange={e => {
            editor.chain().focus().setColor(e.target.value).run();
          }}
          onClick={e => e.stopPropagation()}
        />
      </label>
      <button title="Lien" onClick={() => {
        const url = window.prompt('URL du lien');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }} style={{ background: 'none', border: 'none', color: editor.isActive('link') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaLink /></button>
      <button title="Image" onClick={() => {
        const url = window.prompt('URL de l\'image');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><FaImage /></button>
      <button title="Tableau" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} style={{ background: 'none', border: 'none', color: editor.isActive('table') ? theme?.accent1 || '#f59e42' : '#fff', cursor: 'pointer', padding: 0 }}><FaTable /></button>
      <button title="Effacer format" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><IoMdRemoveCircleOutline /></button>
      <button title="Annuler" onClick={() => editor.chain().focus().undo().run()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><FaUndo /></button>
      <button title="Rétablir" onClick={() => editor.chain().focus().redo().run()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><FaRedo /></button>
    </div>
  );
}
