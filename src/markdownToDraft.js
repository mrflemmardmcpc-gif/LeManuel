import { ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { stateFromMarkdown } from "draft-js-import-markdown";

// Ajoute deux espaces à la fin de chaque ligne pour forcer le saut de ligne Markdown
function addMarkdownLineBreaks(text) {
  return text.replace(/([^\s])\n/g, '$1  \n');
}

export function markdownToDraftState(markdown) {
  // Automatisation des sauts de ligne Markdown
  const markdownWithBreaks = addMarkdownLineBreaks(markdown);
  return stateFromMarkdown(markdownWithBreaks);
}

export function draftStateToRaw(contentState) {
  // Convertit ContentState en format brut Draft.js (pour sauvegarde)
  return convertToRaw(contentState);
}

export function rawToDraftState(raw) {
  // Convertit le format brut Draft.js en ContentState
  return convertFromRaw(raw);
}
