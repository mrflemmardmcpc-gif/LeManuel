import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// Minimal collaborative editor wiring with Y.js + websocket provider.
export default function CollaborativeEditor({ room = "carnet-plomberie-demo", user = { name: "Invité", color: "#0ea5e9" } }) {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(() => new WebsocketProvider("wss://demos.yjs.dev", room, ydoc), [room, ydoc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user,
      }),
    ],
    content: "",
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
      provider.destroy();
      ydoc.destroy();
    };
  }, [editor, provider, ydoc]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="text-sm text-slate-600 mb-2">Éditeur collaboratif (demo Y.js)</div>
      <div className="border rounded min-h-[240px] p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
