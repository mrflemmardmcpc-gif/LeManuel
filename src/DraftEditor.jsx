import React, { useState } from 'react';
import { EditorState, ContentState, RichUtils, Editor } from 'draft-js';
import { stateFromMarkdown } from 'draft-js-import-markdown';

export default function DraftEditor({ initialContent, onChange, readOnly = false }) {
  let contentState;
  if (initialContent) {
    if (typeof initialContent === "string") {
      // Utilise la conversion markdown pour supporter tableaux et formatage
      contentState = stateFromMarkdown(initialContent);
    } else {
      contentState = initialContent;
    }
  }
  // Patch: Vérifie que contentState est bien un ContentState (draft-js)
  function isContentState(obj) {
    return obj && typeof obj.getBlockMap === 'function';
  }
  const [editorState, setEditorState] = useState(
    contentState && isContentState(contentState)
      ? EditorState.createWithContent(contentState)
      : EditorState.createEmpty()
  );

  const handleChange = (state) => {
    setEditorState(state);
    if (onChange) onChange(state);
  };

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div style={{ background: readOnly ? "transparent" : "#1a1a2e", color: "#f8f9fa", padding: 16, borderRadius: 8 }}>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        placeholder="Saisis ou colle ton texte (formatage riche, tableaux, etc.)"
        readOnly={readOnly}
      />
    </div>
  );
}
