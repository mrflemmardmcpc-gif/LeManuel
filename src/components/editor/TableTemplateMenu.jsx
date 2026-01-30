import React from "react";

export default function TableTemplateMenu({
  tableTemplates,
  onInsert,
  theme
}) {
  return (
    <div style={{ backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, borderRadius: 10, boxShadow: theme?.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
      {tableTemplates.map((tpl) => (
        <button key={tpl.key} onClick={() => onInsert(tpl)} style={{ width: "100%", textAlign: "left", padding: 8, borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", marginBottom: 6, fontSize: 12 }}>
          <div style={{ fontWeight: 700 }}>{tpl.label}</div>
          <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
        </button>
      ))}
    </div>
  );
}
