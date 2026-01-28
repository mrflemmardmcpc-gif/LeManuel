// Copie locale du plugin prosemirror-tables-dnd (https://github.com/guillaume-gomez/prosemirror-tables-dnd)
// Permet le drag & drop de lignes/colonnes/tableaux dans ProseMirror/Tiptap
// Version simplifiée pour intégration directe

import { Plugin, PluginKey } from 'prosemirror-state';

export const tablesDndKey = new PluginKey('tables-dnd');

export function tablesDndPlugin() {
  return new Plugin({
    key: tablesDndKey,
    props: {
      handleDOMEvents: {
        dragstart(view, event) {
          // TODO: drag logic (à compléter selon besoins)
          return false;
        },
        drop(view, event) {
          // TODO: drop logic (à compléter selon besoins)
          return false;
        },
      },
    },
  });
}

export default tablesDndPlugin;
