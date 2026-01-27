import React, { useEffect, useRef } from "react";
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
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";

// Ce composant centralisera tout le mode édition (catégorie, module, formattage, etc.)
// Les props attendues sont à ajuster selon les besoins réels
export default function EditorPanel({
  // Edition module
  editTitle,
  setEditTitle,
  editText,
  setEditText,
  editColor,
  setEditColor,
  saveEditSub,
  cancelEdit,
  editingSubId,
  // Edition générale
  editMode,
  setEditMode,
  isAuthenticated,
  theme,
  // Ajout catégorie
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
  // Outils de formattage
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
  // Pour ajout de module (props manquantes)
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
  if (!editMode || !isAuthenticated) return null;
  return (
    <div style={{
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
                        <button key={tpl.key} onClick={() => insertTableTemplate("editSub", tpl.text)} style={{
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
            <button onClick={saveEditSub} style={{
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
          <textarea
            value={newSubText}
            onChange={(e) => setNewSubText(e.target.value)}
            onSelect={(e) => handleTextSelect(e, "newSub")}
            placeholder="Saisis ou colle ton texte (markdown)"
            style={{
              width: "100%",
              minHeight: 160,
              padding: 16,
              borderRadius: 12,
              border: `1.5px solid ${theme?.accent1 || '#10b981'}`,
              background:
                darkMode
                  ? "linear-gradient(135deg, rgba(26,32,44,0.92), rgba(17,24,39,0.92))"
                  : "linear-gradient(135deg, #f8fafc, #eef2ff)",
              color: theme?.text || "#fff",
              fontFamily: "'Inter', 'SFMono-Regular', monospace",
              lineHeight: 1.6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              marginBottom: 12,
              borderColor:
                darkMode
                  ? "rgba(16,185,129,0.45)"
                  : "rgba(16,185,129,0.65)",
              fontSize: 15,
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
                        <button key={tpl.key} onClick={() => insertTableTemplate("newSub", tpl.text)} style={{
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
function TiptapEditor({ value, onChange, darkMode, theme }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Link,
      Color,
      TextStyle,
      Highlight,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
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
        // On traite le collage pour forcer le rendu ligne à ligne
        const text = event.clipboardData?.getData('text/plain');
        if (text) {
          const html = forceParagraphsHtml(text);
          editor.commands.insertContent(html);
          event.preventDefault();
          return true;
        }
        return false;
      },
    },
  });

  // Import initial seulement (pas à chaque modif)
  const didInit = useRef(false);
  useEffect(() => {
    if (editor && value && !didInit.current) {
      let cleanHtml = forceParagraphsHtml(value);
      editor.commands.setContent(cleanHtml, false);
      didInit.current = true;
    }
  }, [value, editor]);

  return (
    <div>
      <TiptapMenuBar editor={editor} theme={theme} />
      <EditorContent editor={editor} />
    </div>
  );
}

function TiptapMenuBar({ editor, theme }) {
  if (!editor) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10, background: theme?.panel || "#23202d", borderRadius: 8, padding: 8, border: `1.5px solid ${theme?.accent1 || '#f59e42'}` }}>
      <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} style={{ fontWeight: 700 }}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} style={{ fontStyle: "italic" }}>I</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} style={{ textDecoration: "underline" }}>U</button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()}>Surligner</button>
      <input type="color" onChange={e => editor.chain().focus().setColor(e.target.value).run()} title="Couleur texte" style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer' }} />
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• Liste</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. Liste</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>Titre</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}>Paragraphe</button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</button>
      <button onClick={() => editor.chain().focus().undo().run()}>↺</button>
      <button onClick={() => editor.chain().focus().redo().run()}>↻</button>
      <button onClick={() => {
        const url = window.prompt('URL de l\'image');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }}>🖼️</button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Tableau</button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>+Col</button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>+Ligne</button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>Suppr Table</button>
    </div>
  );
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
