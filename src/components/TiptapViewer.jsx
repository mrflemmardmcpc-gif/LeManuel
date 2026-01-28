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
import Image from "@tiptap/extension-image";
import "../AppTiptap.css";

export default function TiptapViewer({ html, darkMode, theme }) {
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
    content: html || "",
    editable: false,
    editorProps: {
      attributes: {
        style: `min-height: 180px; font-size: 1.05rem; border: none; background: none; color: inherit; border-radius: 0;`,
      },
    },
  });

  return <EditorContent editor={editor} />;
}
