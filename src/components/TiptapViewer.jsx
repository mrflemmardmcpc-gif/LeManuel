import React from "react";
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

// Custom TableCell/TableHeader pour masquer les cellules vides à l'affichage
const CleanTableCell = TableCell.extend({
  renderHTML({ node, HTMLAttributes }) {
    const textContent = node.textContent?.trim();
    if (!textContent) return ["td", HTMLAttributes, ""];
    return ["td", HTMLAttributes, 0];
  },
});

const CleanTableHeader = TableHeader.extend({
  renderHTML({ node, HTMLAttributes }) {
    const textContent = node.textContent?.trim();
    if (!textContent) return ["th", HTMLAttributes, ""];
    return ["th", HTMLAttributes, 0];
  },
});
import Image from "@tiptap/extension-image";
import "../AppTiptap.css";

// Nettoie et transforme le JSON pour :
// - supprimer les cellules vides
// - transformer la première ligne et la première colonne en th (header)
function cleanTableCellsFromJSON(json, parentType = null, rowIndex = 0) {
  if (!json || typeof json !== 'object') return json;
  if (Array.isArray(json)) return json.map((item, i) => cleanTableCellsFromJSON(item, parentType, i)).filter(Boolean);
  if (json.type === 'tableRow' && Array.isArray(json.content)) {
    // Nettoie les cellules vides
    json.content = json.content.filter(cell => {
      if (!cell || !cell.content || !Array.isArray(cell.content)) return false;
      return cell.content.some(n => {
        if (n.type === 'text') return n.text && n.text.replace(/\u200B|\s|<br\s*\/?>(\n)?/g, '').length > 0;
        if (n.content && Array.isArray(n.content)) {
          return n.content.some(sub => sub.type === 'text' && sub.text && sub.text.replace(/\u200B|\s|<br\s*\/?>(\n)?/g, '').length > 0);
        }
        return false;
      });
    });
    // Transforme la première cellule de chaque ligne en th (header)
    json.content = json.content.map((cell, colIndex) => {
      if (!cell) return cell;
      // Si première colonne OU première ligne, force type tableHeader
      if (colIndex === 0 || rowIndex === 0) {
        return { ...cell, type: 'tableHeader' };
      }
      return cell;
    });
    // Si la ligne ne contient plus aucune cellule, on la supprime aussi
    if (json.content.length === 0) return null;
  } else if (json.content) {
    json.content = json.content.map((item, i) => cleanTableCellsFromJSON(item, json.type, i)).filter(Boolean);
  }
  return json;
}

export default function TiptapViewer({ html, darkMode, theme }) {
  // Si le contenu est du JSON (Tiptap), on le nettoie
  let content = html;
  try {
    if (typeof html === 'object' && html !== null) {
      content = cleanTableCellsFromJSON(JSON.parse(JSON.stringify(html)));
    } else if (typeof html === 'string' && html.trim().startsWith('{')) {
      const parsed = JSON.parse(html);
      content = cleanTableCellsFromJSON(parsed);
    }
  } catch (e) {
    // fallback : ne rien faire
  }
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Bold,
      Italic,
      Underline,
      Link,
      Color,
      TextStyle,
      Highlight,
      Table.configure({ resizable: true }),
      TableRow,
      CleanTableHeader,
      CleanTableCell,
      Image,
    ],
    content: content || "",
    editable: false,
    editorProps: {
      attributes: {
        style: `min-height: 180px; font-size: 1.05rem; border: none; background: none; color: inherit; border-radius: 0;`,
      },
    },
  });

  return <EditorContent editor={editor} />;
}
