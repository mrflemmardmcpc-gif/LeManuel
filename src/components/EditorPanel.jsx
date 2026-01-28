// FontSize extension is not official; use custom extension below
import { Extension } from '@tiptap/core';
import TableHeader from "@tiptap/extension-table-header";
import React, { useEffect, useRef, useState } from "react";
import "../AppTiptap.css";

// Normalise les retours à la ligne en <br> pour la sauvegarde
function normalizeLineBreaks(text) {
  return text.replace(/\n/g, '<br>');
}
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";

import TableCell from "@tiptap/extension-table-cell";


const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style') || null,
        renderHTML: attributes => ({}), // handled below
      },
      'data-ttcolor': {
        default: null,
        parseHTML: element => element.getAttribute('data-ttcolor') || null,
        renderHTML: attributes => ({}), // handled below
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    // DEBUG: log le style généré
    console.log('CustomTableCell renderHTML', HTMLAttributes);
    const attrs = { ...HTMLAttributes };
    if (HTMLAttributes.style) attrs.style = HTMLAttributes.style;
    if (HTMLAttributes['data-ttcolor']) attrs['data-ttcolor'] = HTMLAttributes['data-ttcolor'];
    return ['td', attrs, 0];
  },
});

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style') || null,
        renderHTML: attributes => ({}), // handled below
      },
      'data-ttcolor': {
        default: null,
        parseHTML: element => element.getAttribute('data-ttcolor') || null,
        renderHTML: attributes => ({}), // handled below
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    // DEBUG: log le style généré
    console.log('CustomTableHeader renderHTML', HTMLAttributes);
    const attrs = { ...HTMLAttributes };
    if (HTMLAttributes.style) attrs.style = HTMLAttributes.style;
    if (HTMLAttributes['data-ttcolor']) attrs['data-ttcolor'] = HTMLAttributes['data-ttcolor'];
    return ['th', attrs, 0];
  },
});


import Image from "@tiptap/extension-image";
import { FaBold, FaItalic, FaUnderline, FaHighlighter, FaListUl, FaListOl, FaHeading, FaParagraph, FaUndo, FaRedo, FaTable, FaPlus, FaTrash, FaImage, FaPalette, FaTextHeight } from 'react-icons/fa';

// Ce composant centralisera tout le mode édition (catégorie, module, formattage, etc.)
// Les props attendues sont à ajuster selon les besoins réels
export default function EditorPanel({
  editTitle,
  setEditTitle,
  editText,
  setEditText,
  editColor,
  setEditColor,
  saveEditSub,
  cancelEdit,
  editingSubId,
  editMode,
  setEditMode,
  isAuthenticated,
  theme,
  newCatTitle,
  setNewCatTitle,
  newCatEmoji,
  setNewCatEmoji,
  newCatColor,
  setNewCatColor,
  newCatSection,
  setNewCatSection,
  addCategory,
  sections,
  selectionInfo,
  setSelectionInfo,
  applyFormatting,
  applyColorToSelection,
  tableMenuOpen,
  setTableMenuOpen,
  tableTemplates,
  quickColors,
  selectionCustomColor,
  setSelectionCustomColor,
  darkMode,
  addingSubToCatId,
  newSubTitle,
  setNewSubTitle,
  newSubText,
  setNewSubText,
  newSubColor,
  setNewSubColor,
  saveNewSub,
  cancelAddingSub,
  handleTextSelect,
  insertTableTemplate
}) {

  // State global pour la couleur du surligneur (doit être tout en haut !)
  const [highlightColor, setHighlightColor] = React.useState('#fbbf24');

  // Ref pour scroller en haut lors de l'édition
  const editPanelRef = useRef(null);

  // Ajoute ce state juste après les autres useState ou hooks principaux
  const [editorInstance, setEditorInstance] = useState(null);

  // Scroll automatique en haut lors de l'édition d'un module ou d'une catégorie
  useEffect(() => {
    if (editingSubId || newCatTitle === "") {
      setTimeout(() => {
        if (editPanelRef.current) {
          editPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [editingSubId, newCatTitle]);
  // Convertit <br> en retour à la ligne pour édition
  function normalizeForEditor(text) {
    return typeof text === 'string' ? text.replace(/<br\s*\/?>(\n)?/g, '\n') : text;
  }
  // Normalisation à l'ouverture de l'éditeur
  React.useEffect(() => {
    if (editText && typeof editText === 'string' && editText.includes('<br')) {
      setEditText(normalizeForEditor(editText));
    }
    // eslint-disable-next-line
  }, []);

  if (!editMode || !isAuthenticated) return null;

  return (
    <div ref={editPanelRef} style={{
      background: theme?.bg || "#f8fafc",
      border: `2px solid ${theme?.accent1 || "#f59e42"}`,
      borderRadius: 18,
      padding: 32,
      marginBottom: 32,
      boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
      maxWidth: 1200,
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
    }}>
      <h2 style={{ color: theme?.accent1 || "#f59e42", margin: 0, fontWeight: 800, fontSize: 24, letterSpacing: 0.2 }}>Mode édition centralisé</h2>
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
          <span style={{ fontSize: 26, color: theme?.accent1 || "#f59e42", fontWeight: 700, marginRight: 6 }}>➕</span>
          <h3 style={{ margin: 0, color: theme?.accent1 || "#f59e42", fontSize: 20, fontWeight: 700, letterSpacing: 0.1 }}>Ajouter une catégorie</h3>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1.1fr 1.1fr 2.5fr",
          gap: 18,
          alignItems: "end",
          marginTop: 8,
          marginBottom: 0,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || "#888", fontWeight: 600 }}>Nom</label>
            <input
              value={newCatTitle}
              onChange={(e) => setNewCatTitle(e.target.value)}
              placeholder="Nom de la catégorie"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 10,
                border: `1.5px solid ${theme?.border || "#f59e42"}`,
                background: theme?.input || "#23202d",
                color: theme?.text || "#fff",
                fontSize: 16,
                fontWeight: 500,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || "#888", fontWeight: 600 }}>Emoji</label>
            <input
              value={newCatEmoji}
              onChange={(e) => setNewCatEmoji(e.target.value)}
              placeholder="Emoji"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 10,
                border: `1.5px solid ${theme?.border || "#f59e42"}`,
                background: theme?.input || "#23202d",
                color: theme?.text || "#fff",
                fontSize: 16,
                fontWeight: 500,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || "#888", fontWeight: 600 }}>Couleur</label>
            <input
              type="color"
              value={newCatColor}
              onChange={(e) => setNewCatColor(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 10,
                border: `1.5px solid ${theme?.border || "#f59e42"}`,
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, color: theme?.subtext || "#888", fontWeight: 600 }}>Grande partie</label>
            <select
              value={newCatSection || ""}
              onChange={(e) => setNewCatSection(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 10,
                border: `1.5px solid ${theme?.border || "#f59e42"}`,
                background: theme?.input || "#23202d",
                color: theme?.text || "#fff",
                fontSize: 16,
                fontWeight: 500,
                outline: "none",
                transition: "border 0.2s",
              }}
            >
              <option value="">Choisir...</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.emoji} {section.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={addCategory}
          style={{
            marginTop: 10,
            padding: "14px 32px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
            color: "white",
            border: "none",
            fontWeight: 700,
            fontSize: 18,
            boxShadow: "0 2px 8px rgba(16,185,129,0.13)",
            letterSpacing: 0.1,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          ✅ Créer la catégorie
        </button>
      </div>
      {/* Edition d'un module (sous-catégorie) */}
      {editingSubId && (
        <div style={{
          margin: "40px auto 0 auto",
          background: theme?.panel || "#23202d",
          borderRadius: 16,
          padding: "32px 24px",
          border: `1.5px solid ${theme?.accent1 || "#f59e42"}`,
          boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
          maxWidth: 700,
        }}>
          <h3 style={{ color: theme?.accent1 || "#f59e42", fontWeight: 700, fontSize: 20, marginBottom: 18 }}>✏️ Modifier un module</h3>
          <input
            placeholder="Titre"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: `1.5px solid ${theme?.border || "#f59e42"}`,
              background: theme?.input || "#23202d",
              color: theme?.text || "#fff",
              fontSize: 16,
              marginBottom: 12,
            }}
          />
          <div style={{ marginBottom: 16 }}>
            {/* TipTap Editor */}
            <TiptapEditor
              value={editText}
              onChange={setEditText}
              darkMode={darkMode}
              theme={theme}
              setEditorInstance={setEditorInstance}
              highlightColor={highlightColor}
              setHighlightColor={setHighlightColor}
            />
          </div>
          {/* Outils de formattage */}
          {selectionInfo.text && selectionInfo.target === "editSub" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: theme?.subtext }}>{`"${selectionInfo.text}"`}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => applyFormatting("bold")}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    fontWeight: 800,
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  G
                </button>
                <button
                  onClick={() => applyFormatting("italic")}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    fontStyle: "italic",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  I
                </button>
                <button
                  onClick={() => applyFormatting("underline")}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  U
                </button>
                {[14, 16, 18, 20].map((s) => (
                  <button key={s} onClick={() => applyFormatting("size", s)} style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    cursor: "pointer",
                    fontSize: 12,
                  }}>
                    {s}px
                  </button>
                ))}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setTableMenuOpen(tableMenuOpen === "editSub" ? null : "editSub")}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${theme?.border}`,
                      backgroundColor: theme?.bg,
                      color: theme?.text,
                      cursor: "pointer",
                      fontSize: 12,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    📊
                    <span style={{ fontWeight: 700 }}>Table</span>
                  </button>
                  {tableMenuOpen === "editSub" && (
                    <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, borderRadius: 10, boxShadow: theme?.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
                      {tableTemplates.map((tpl) => (
                        <button key={tpl.key} onClick={() => {
                          if (editorInstance) {
                            editorInstance.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run();
                            setTableMenuOpen(null);
                            setSelectionInfo({ text: "", start: 0, end: 0, target: null });
                          } else {
                            insertTableTemplate("editSub", tpl.text);
                          }
                        }} style={{
                          width: "100%",
                          textAlign: "left",
                          padding: 8,
                          borderRadius: 8,
                          border: `1px solid ${theme?.border}`,
                          backgroundColor: theme?.bg,
                          color: theme?.text,
                          cursor: "pointer",
                          marginBottom: 6,
                          fontSize: 12,
                        }}>
                          <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {quickColors.map((c) => (
                <button key={c} onClick={() => applyColorToSelection(c)} style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: `1px solid ${theme?.border}`,
                  backgroundColor: c,
                  cursor: "pointer",
                }} />
              ))}
              <input
                type="color"
                value={selectionCustomColor}
                onChange={(e) => setSelectionCustomColor(e.target.value)}
                style={{
                  width: 32,
                  height: 32,
                  padding: 2,
                  borderRadius: 8,
                  border: `1px solid ${theme?.border}`,
                  cursor: "pointer",
                }}
              />
              <button
                onClick={() => applyColorToSelection(selectionCustomColor)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                OK
              </button>
              <button
                onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }}
                style={{
                  padding: "6px 8px",
                  borderRadius: 8,
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                ✖
              </button>
            </div>
          )}
          <input
            type="color"
            value={editColor}
            onChange={(e) => setEditColor(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: `1.5px solid ${theme?.border || '#f59e42'}`,
              cursor: "pointer",
              marginBottom: 10,
            }}
          />
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button onClick={() => {
              setEditText(prev => normalizeLineBreaks(prev));
              saveEditSub();
            }} style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: 16,
            }}>💾 Enregistrer</button>
            <button onClick={cancelEdit} style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: 16,
            }}>Annuler</button>
          </div>
        </div>
      )}
      {/* Ajout d'un module (sous-catégorie) */}
      {addingSubToCatId && (
        <div style={{
          margin: "40px auto 0 auto",
          background: theme?.panel || "#23202d",
          borderRadius: 16,
          padding: "32px 24px",
          border: `1.5px dashed ${theme?.accent1 || '#10b981'}`,
          boxShadow: theme?.shadow || "0 8px 32px rgba(0,0,0,0.08)",
          maxWidth: 700,
        }}>
          <h3 style={{ color: theme?.accent1 || "#10b981", fontWeight: 700, fontSize: 20, marginBottom: 18 }}>➕ Ajouter un module</h3>
          <input
            placeholder="Titre"
            value={newSubTitle}
            onChange={(e) => setNewSubTitle(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: `1.5px solid ${theme?.border || '#10b981'}`,
              background: theme?.input || "#23202d",
              color: theme?.text || "#fff",
              fontSize: 16,
              marginBottom: 12,
            }}
          />

          {/* Outils de formattage */}
          {selectionInfo.text && selectionInfo.target === "newSub" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: theme?.subtext }}>{`"${selectionInfo.text}"`}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => applyFormatting("bold")}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    fontWeight: 800,
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  G
                </button>
                <button
                  onClick={() => applyFormatting("italic")}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    fontStyle: "italic",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  I
                </button>
                <button
                  onClick={() => applyFormatting("underline")}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  U
                </button>
                {[14, 16, 18, 20].map((s) => (
                  <button key={s} onClick={() => applyFormatting("size", s)} style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: `1px solid ${theme?.border}`,
                    backgroundColor: theme?.bg,
                    color: theme?.text,
                    cursor: "pointer",
                    fontSize: 12,
                  }}>
                    {s}px
                  </button>
                ))}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setTableMenuOpen(tableMenuOpen === "newSub" ? null : "newSub")}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${theme?.border}`,
                      backgroundColor: theme?.bg,
                      color: theme?.text,
                      cursor: "pointer",
                      fontSize: 12,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    📊
                    <span style={{ fontWeight: 700 }}>Table</span>
                  </button>
                  {tableMenuOpen === "newSub" && (
                    <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, borderRadius: 10, boxShadow: theme?.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
                      {tableTemplates.map((tpl) => (
                        <button key={tpl.key} onClick={() => {
                          if (editorInstance) {
                            editorInstance.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run();
                            setTableMenuOpen(null);
                            setSelectionInfo({ text: "", start: 0, end: 0, target: null });
                          } else {
                            insertTableTemplate("newSub", tpl.text);
                          }
                        }} style={{
                          width: "100%",
                          textAlign: "left",
                          padding: 8,
                          borderRadius: 8,
                          border: `1px solid ${theme?.border}`,
                          backgroundColor: theme?.bg,
                          color: theme?.text,
                          cursor: "pointer",
                          marginBottom: 6,
                          fontSize: 12,
                        }}>
                          <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {quickColors.map((c) => (
                <button key={c} onClick={() => applyColorToSelection(c)} style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: `1px solid ${theme?.border}`,
                  backgroundColor: c,
                  cursor: "pointer",
                }} />
              ))}
              <input
                type="color"
                value={selectionCustomColor}
                onChange={(e) => setSelectionCustomColor(e.target.value)}
                style={{
                  width: 32,
                  height: 32,
                  padding: 2,
                  borderRadius: 8,
                  border: `1px solid ${theme?.border}`,
                  cursor: "pointer",
                }}
              />
              <button
                onClick={() => applyColorToSelection(selectionCustomColor)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                OK
              </button>
              <button
                onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }}
                style={{
                  padding: "6px 8px",
                  borderRadius: 8,
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                ✖
              </button>
            </div>
          )}
          <input
            type="color"
            value={newSubColor}
            onChange={(e) => setNewSubColor(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: `1.5px solid ${theme?.border || '#f59e42'}`,
              cursor: "pointer",
              marginBottom: 10,
            }}
          />
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button onClick={saveNewSub} style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: 16,
            }}>✅ Ajouter</button>
            <button onClick={cancelAddingSub} style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: 16,
            }}>Annuler</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setEditMode(false)}
        style={{
          marginTop: 32,
          padding: "12px 32px",
          borderRadius: 12,
          background: "#ef4444",
          color: "white",
          border: "none",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: 0.1,
          boxShadow: "0 2px 8px rgba(239,68,68,0.13)",
          cursor: "pointer",
        }}
      >
        Quitter le mode édition
      </button>
    </div>
  );
}

// TipTap Editor Component
function TiptapEditor({ value, onChange, darkMode, theme, setEditorInstance, highlightColor, setHighlightColor }) {
    // Supprimer la ligne courante de la cellule sélectionnée
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

    // Supprimer la colonne courante de la cellule sélectionnée
    function handleDeleteColumn() {
      if (!editor || contextMenu.cellPos == null) return;
      if (editor.chain) {
        editor.chain().focus().setNodeSelection(contextMenu.cellPos).deleteColumn().run();
      }
      setContextMenu({ ...contextMenu, visible: false });
    }

    // Transformer la cellule sélectionnée en header (th)
    function handleCellToHeader() {
      if (!editor || contextMenu.cellPos == null) return;
      const { state } = editor;
      const node = state.doc.nodeAt(contextMenu.cellPos);
      if (node && node.type.name === 'tableCell') {
        // Remplacer par un tableHeader
        const tableHeaderType = state.schema.nodes.tableHeader;
        const newNode = tableHeaderType.create(node.attrs, node.content, node.marks);
        const tr = state.tr.replaceWith(contextMenu.cellPos, contextMenu.cellPos + node.nodeSize, newNode);
        editor.view.dispatch(tr);
      }
      setContextMenu({ ...contextMenu, visible: false });
    }
  // Affichage des boutons +Col/+Ligne discrets au-dessus du tableau si le curseur est dans un tableau
  const [showTableHandles, setShowTableHandles] = useState(false);
  const [tablePos, setTablePos] = useState(null);
  const editorContentRef = useRef();
  const [tableCoords, setTableCoords] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Color,
      TextStyle,
      // Custom FontSize extension using TextStyle
      Extension.create({
        name: 'fontSize',
        addOptions() {
          return {
            types: ['textStyle'],
          }
        },
        addGlobalAttributes() {
          return [
            {
              types: ['textStyle'],
              attributes: {
                fontSize: {
                  default: null,
                  parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
                  renderHTML: attributes => {
                    if (!attributes.fontSize) {
                      return {};
                    }
                    return {
                      style: `font-size: ${attributes.fontSize}`,
                    };
                  },
                },
              },
            },
          ];
        },
        addCommands() {
          return {
            setFontSize: size => ({ chain }) => {
              return chain().setMark('textStyle', { fontSize: size }).run();
            },
            unsetFontSize: () => ({ chain }) => {
              return chain().setMark('textStyle', { fontSize: null }).run();
            },
          };
        },
      }),
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      CustomTableHeader,
      CustomTableCell,
      Image,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `background: ${darkMode ? '#181c24' : '#f8fafc'}; color: ${darkMode ? '#f3f4f6' : '#181c24'}; border-radius: 12px; min-height: 180px; font-size: 1.05rem; border: 1.5px solid ${theme?.accent1 || '#f59e42'}`,
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
        // Suppr/Backspace : suppression intelligente dans les tableaux
        if ((event.key === 'Backspace' || event.key === 'Delete')) {
          const { state, dispatch } = view;
          const { selection } = state;
          // Supprimer le tableau entier si tout est sélectionné
          let tablePos = null;
          state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if (node.type.name === 'table' && tablePos === null) {
              if (selection.from <= pos && selection.to >= pos + node.nodeSize - 1) {
                tablePos = pos;
              }
            }
          });
          if (tablePos !== null) {
            const node = state.doc.nodeAt(tablePos);
            if (node) {
              dispatch(state.tr.delete(tablePos, tablePos + node.nodeSize));
              event.preventDefault();
              return true;
            }
          }
          // Supprimer la ligne entière si toute la ligne est sélectionnée
          let rowPos = null;
          let fullRowSelected = false;
          state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if (node.type.name === 'tableRow' && rowPos === null) {
              if (selection.from <= pos && selection.to >= pos + node.nodeSize - 1) {
                rowPos = pos;
                fullRowSelected = true;
              }
            }
          });
          if (fullRowSelected && view.props.editor && view.props.editor.chain) {
            view.props.editor.chain().focus().deleteRow().run();
            event.preventDefault();
            return true;
          }
          // Supprimer la colonne entière si toute la colonne est sélectionnée (simplifié)
          let colToDelete = null;
          let tableNode = null;
          let tableStart = null;
          const table = state.schema.nodes.table;
          state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if (node.type === table && tableNode === null) {
              tableNode = node;
              tableStart = pos;
            }
          });
          if (tableNode && tableStart !== null && view.props.editor && view.props.editor.chain) {
            // On vérifie si la sélection couvre toutes les cellules d'une colonne (même index sur chaque ligne)
            const firstRow = tableNode.child(0);
            if (firstRow) {
              for (let colIdx = 0; colIdx < firstRow.childCount; colIdx++) {
                let fullColSelected = true;
                for (let rowIdx = 0; rowIdx < tableNode.childCount; rowIdx++) {
                  const row = tableNode.child(rowIdx);
                  if (colIdx >= row.childCount) {
                    fullColSelected = false;
                    break;
                  }
                  let cellPos = tableStart + 1;
                  for (let i = 0; i < rowIdx; i++) {
                    cellPos += tableNode.child(i).nodeSize;
                  }
                  for (let j = 0; j < colIdx; j++) {
                    cellPos += row.child(j).nodeSize;
                  }
                  const cell = row.child(colIdx);
                  const from = cellPos;
                  const to = cellPos + cell.nodeSize - 1;
                  if (!(selection.from <= from && selection.to >= to)) {
                    fullColSelected = false;
                    break;
                  }
                }
                if (fullColSelected) {
                  view.props.editor.chain().focus().deleteColumn().run();
                  event.preventDefault();
                  return true;
                }
              }
            }
          }
          // Sinon, si la sélection couvre toute une cellule, supprime la cellule
          let cellPos = null;
          state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if ((node.type.name === 'tableCell' || node.type.name === 'tableHeader') && cellPos === null) {
              if (selection.from <= pos && selection.to >= pos + node.nodeSize - 1) {
                cellPos = pos;
              }
            }
          });
          if (cellPos !== null) {
            const node = state.doc.nodeAt(cellPos);
            if (node) {
              dispatch(state.tr.delete(cellPos, cellPos + node.nodeSize));
              event.preventDefault();
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  // Affichage dynamique des boutons contextuels pour tableau (doit être en dehors de l'array extensions)
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
    // Cherche le DOM node du tableau
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

  // Import initial seulement (pas à chaque modif)
  const didInit = useRef(false);
  useEffect(() => {
    if (editor && value && !didInit.current) {
      let cleanHtml = isProbablyHtml(value) ? value : forceParagraphsHtml(value);
      // Conversion automatique des tableaux markdown en tables Tiptap
      const tableMdRegex = /((?:^\|.+\|$\n?)+)/gm;
      let docJson = null;
      if (!isProbablyHtml(value) && tableMdRegex.test(value)) {
        // On parse le markdown et on remplace chaque bloc par un vrai tableau
        let replaced = value;
        let match;
        let tables = [];
        tableMdRegex.lastIndex = 0;
        while ((match = tableMdRegex.exec(value)) !== null) {
          const tableNode = markdownTableToTiptapTable(match[1]);
          if (tableNode) tables.push({ node: tableNode, raw: match[1] });
        }
        // On construit un doc Tiptap JSON
        docJson = {
          type: 'doc',
          content: []
        };
        let lastIndex = 0;
        tables.forEach(({ node, raw }) => {
          // Ajoute le texte avant le tableau
          const before = value.slice(lastIndex, value.indexOf(raw, lastIndex));
          if (before.trim()) docJson.content.push({ type: 'paragraph', content: [{ type: 'text', text: before.trim() }] });
          docJson.content.push(node);
          lastIndex = value.indexOf(raw, lastIndex) + raw.length;
        });
        // Ajoute le texte après le dernier tableau
        const after = value.slice(lastIndex);
        if (after.trim()) docJson.content.push({ type: 'paragraph', content: [{ type: 'text', text: after.trim() }] });
      }
      if (docJson) {
        editor.commands.setContent(docJson, false);
      } else {
        editor.commands.setContent(cleanHtml, false);
      }
      didInit.current = true;
    }
  }, [value, editor]);

  useEffect(() => {
    if (editor && setEditorInstance) setEditorInstance(editor);
  }, [editor, setEditorInstance]);

  // Conversion automatique markdown-table -> table Tiptap
  function markdownTableToTiptapTable(md) {
    const lines = md.trim().split('\n').filter(l => l.trim().startsWith('|') && l.trim().endsWith('|'));
    if (lines.length < 2) return null;
    const header = lines[0].split('|').slice(1, -1).map(cell => cell.trim());
    const rows = lines.slice(2).map(row => row.split('|').slice(1, -1).map(cell => cell.trim()));
    return {
      type: 'table',
      attrs: {},
      content: [
        {
          type: 'tableRow',
          content: header.map(cell => ({ type: 'tableHeader', content: [{ type: 'text', text: cell }] }))
        },
        ...rows.map(row => ({
          type: 'tableRow',
          content: row.map(cell => ({ type: 'tableCell', content: [{ type: 'text', text: cell }] }))
        }))
      ]
    };
  }

  useEffect(() => {
    if (editor && value && !didInit.current) {
      let cleanHtml = isProbablyHtml(value) ? value : forceParagraphsHtml(value);
      // Conversion automatique des tableaux markdown en tables Tiptap
      const tableMdRegex = /((?:^\|.+\|$\n?)+)/gm;
      let docJson = null;
      if (!isProbablyHtml(value) && tableMdRegex.test(value)) {
        // On parse le markdown et on remplace chaque bloc par un vrai tableau
        let replaced = value;
        let match;
        let tables = [];
        tableMdRegex.lastIndex = 0;
        while ((match = tableMdRegex.exec(value)) !== null) {
          const tableNode = markdownTableToTiptapTable(match[1]);
          if (tableNode) tables.push({ node: tableNode, raw: match[1] });
        }
        // On construit un doc Tiptap JSON
        docJson = {
          type: 'doc',
          content: []
        };
        let lastIndex = 0;
        tables.forEach(({ node, raw }) => {
          // Ajoute le texte avant le tableau
          const before = value.slice(lastIndex, value.indexOf(raw, lastIndex));
          if (before.trim()) docJson.content.push({ type: 'paragraph', content: [{ type: 'text', text: before.trim() }] });
          docJson.content.push(node);
          lastIndex = value.indexOf(raw, lastIndex) + raw.length;
        });
        // Ajoute le texte après le dernier tableau
        const after = value.slice(lastIndex);
        if (after.trim()) docJson.content.push({ type: 'paragraph', content: [{ type: 'text', text: after.trim() }] });
      }
      if (docJson) {
        editor.commands.setContent(docJson, false);
      } else {
        editor.commands.setContent(cleanHtml, false);
      }
      didInit.current = true;
    }
  }, [value, editor]);

  // Menu contextuel pour cellule de tableau
  const contextMenuRef = useRef();
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, cellPos: null });

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
      // Si on clique sur le tableau mais pas sur une cellule, on prend la première cellule de la ligne
      if (node.type.name === 'tableRow' && !found) {
        if (node.childCount > 0) {
          cellNodePos = nodePos + 1; // premier enfant
          found = true;
        }
      }
    });
    if (found && cellNodePos != null) {
      setContextMenu({ visible: true, x: event.clientX, y: event.clientY, cellPos: cellNodePos });
      event.preventDefault();
    }
  }

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

  function handleColorCell(color) {
    if (!editor || contextMenu.cellPos == null) return;
    const { state } = editor;
    let tr = state.tr;
    const node = state.doc.nodeAt(contextMenu.cellPos);
    if (node && (node.type.name === 'tableCell' || node.type.name === 'tableHeader')) {
      console.debug('[handleColorCell] Appliquer couleur', color, 'à la cellule', node, 'pos', contextMenu.cellPos);
      // Nettoie tout background-color existant dans le style
      let style = node.attrs.style || '';
      style = style.replace(/background-color:[^;]+;?/gi, '');
      style = `background-color:${color} !important;${style}`.trim();
      style = style.replace(/;\s*$/, '');
      const newAttrs = { ...node.attrs, style, ['data-ttcolor']: color };
      let newNode;
      if (node.content.size === 0) {
        // Si la cellule est vide, crée explicitement un paragraphe vide
        const paragraph = node.type.schema.nodes.paragraph.create();
        newNode = node.type.create(newAttrs, paragraph, node.marks);
      } else {
        newNode = node.type.create(newAttrs, node.content, node.marks);
      }
      tr = tr.replaceWith(contextMenu.cellPos, contextMenu.cellPos + node.nodeSize, newNode);
      if (tr.docChanged) editor.view.dispatch(tr);
    } else {
      console.debug('[handleColorCell] Pas de cellule trouvée à la position', contextMenu.cellPos, node);
    }
    setContextMenu({ ...contextMenu, visible: false });
  }

  // --- BOUTON DE REPARATION DES TABLEAUX ---
  function repairAllTableCells() {
    if (!editor) return;
    const { state, view } = editor;
    let tr = state.tr;
    let changed = false;
    state.doc.descendants((node, pos) => {
      if (
        (node.type.name === 'tableCell' || node.type.name === 'tableHeader') &&
        node.content.size === 0
      ) {
        const paragraph = node.type.schema.nodes.paragraph.create();
        const newNode = node.type.create(node.attrs, paragraph, node.marks);
        tr = tr.replaceWith(pos, pos + node.nodeSize, newNode);
        changed = true;
      }
    });
    if (changed) view.dispatch(tr);
    alert('Réparation des cellules vides terminée.');
  }


  // Supprimer la ligne courante de la cellule sélectionnée
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

  // Supprimer la colonne courante de la cellule sélectionnée
  function handleDeleteColumn() {
    if (!editor || contextMenu.cellPos == null) return;
    if (editor.chain) {
      editor.chain().focus().setNodeSelection(contextMenu.cellPos).deleteColumn().run();
    }
    setContextMenu({ ...contextMenu, visible: false });
  }

  // Transformer la cellule sélectionnée en header (th)
  function handleCellToHeader() {
    if (!editor || contextMenu.cellPos == null) return;
    const { state } = editor;
    const node = state.doc.nodeAt(contextMenu.cellPos);
    if (node && node.type.name === 'tableCell') {
      // Remplacer par un tableHeader
      const tableHeaderType = state.schema.nodes.tableHeader;
      const newNode = tableHeaderType.create(node.attrs, node.content, node.marks);
      const tr = state.tr.replaceWith(contextMenu.cellPos, contextMenu.cellPos + node.nodeSize, newNode);
      editor.view.dispatch(tr);
    }
    setContextMenu({ ...contextMenu, visible: false });
  }

  return (
    <div style={{ position: 'relative' }}>
      <TiptapMenuBar editor={editor} theme={theme} highlightColor={highlightColor} setHighlightColor={setHighlightColor} />
      <div onContextMenu={handleContextMenu} style={{ minHeight: 180, position: 'relative' }} ref={editorContentRef}>
        <EditorContent editor={editor} />
        {/* Boutons +Col/+Ligne contextuels, petits et discrets */}
        {showTableHandles && tableCoords && (
          <div style={{
            position: 'absolute',
            left: tableCoords.left - editorContentRef.current.getBoundingClientRect().left + tableCoords.width / 2 - 44,
            top: tableCoords.top - editorContentRef.current.getBoundingClientRect().top - 32,
            display: 'flex',
            gap: 8,
            zIndex: 100,
            pointerEvents: 'auto',
          }}>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              style={{
                background: '#23202d',
                color: '#f59e42',
                border: 'none',
                borderRadius: 12,
                fontSize: 13,
                opacity: 0.7,
                padding: '2px 8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                transition: 'opacity 0.2s',
                cursor: 'pointer',
                minWidth: 0,
                height: 22,
                lineHeight: 1,
                fontWeight: 700,
                position: 'relative',
              }}
              title="Ajouter une colonne"
            >
              <FaPlus style={{ fontSize: 12, marginRight: 2 }} />Col
            </button>
            <button
              onClick={() => editor.chain().focus().addRowAfter().run()}
              style={{
                background: '#23202d',
                color: '#10b981',
                border: 'none',
                borderRadius: 12,
                fontSize: 13,
                opacity: 0.7,
                padding: '2px 8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                transition: 'opacity 0.2s',
                cursor: 'pointer',
                minWidth: 0,
                height: 22,
                lineHeight: 1,
                fontWeight: 700,
                position: 'relative',
              }}
              title="Ajouter une ligne"
            >
              <FaPlus style={{ fontSize: 12, marginRight: 2 }} />Ligne
            </button>
          </div>
        )}
      </div>
      {contextMenu.visible && (
        <div ref={contextMenuRef} style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x, zIndex: 9999, background: '#23202d', color: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: 8, minWidth: 160 }}>
          <div style={{ padding: 8, cursor: 'pointer' }} onClick={handleDeleteCell}>Supprimer la cellule</div>
          <div style={{ padding: 8, cursor: 'pointer' }} onClick={handleDeleteRow}>Supprimer la ligne</div>
          <div style={{ padding: 8, cursor: 'pointer' }} onClick={handleDeleteColumn}>Supprimer la colonne</div>
          <div style={{ padding: 8, cursor: 'pointer' }} onClick={handleCellToHeader}>Transformer en titre (th)</div>
          <div style={{ padding: 8, fontWeight: 600 }}>Couleur de la cellule :</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 8px 8px 8px' }}>
            {["#f59e42", "#10b981", "#3b82f6", "#e11d48", "#fbbf24", "#23202d", "#fff"].map(c => (
              <button key={c} onClick={() => handleColorCell(c)} style={{ width: 22, height: 22, borderRadius: 5, border: '1.5px solid #888', background: c, cursor: 'pointer' }} />
            ))}
            <input type="color" onChange={e => handleColorCell(e.target.value)} style={{ width: 26, height: 26, border: 'none', background: 'none', cursor: 'pointer' }} />
          </div>
        </div>
      )}
    </div>
  );
}

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
