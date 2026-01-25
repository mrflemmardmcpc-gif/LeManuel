import { ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { stateFromMarkdown } from "draft-js-import-markdown";

export function markdownToDraftState(markdown) {
  // Convertit le markdown en ContentState Draft.js
  return stateFromMarkdown(markdown);
}

export function draftStateToRaw(contentState) {
  // Convertit ContentState en format brut Draft.js (pour sauvegarde)
  return convertToRaw(contentState);
}

export function rawToDraftState(raw) {
  // Convertit le format brut Draft.js en ContentState
  return convertFromRaw(raw);
}
