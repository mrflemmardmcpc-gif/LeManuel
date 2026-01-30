import React from "react";

export default function FormattingTools({
  selectionInfo,
  applyFormatting,
  applyColorToSelection,
  tableMenuOpen,
  setTableMenuOpen,
  tableTemplates,
  editorInstance,
  setSelectionInfo,
  insertTableTemplate,
  quickColors,
  selectionCustomColor,
  setSelectionCustomColor,
  theme,
  target
}) {
  if (!selectionInfo.text || selectionInfo.target !== target) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, marginBottom: 10 }}>
      <span style={{ fontSize: 12, color: theme?.subtext }}>{`"${selectionInfo.text}"`}</span>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => applyFormatting("bold")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, fontWeight: 800, cursor: "pointer", fontSize: 12 }}>G</button>
        <button onClick={() => applyFormatting("italic")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, fontStyle: "italic", cursor: "pointer", fontSize: 12 }}>I</button>
        <button onClick={() => applyFormatting("underline")} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, textDecoration: "underline", cursor: "pointer", fontSize: 12 }}>U</button>
        {[14, 16, 18, 20].map((s) => (
          <button key={s} onClick={() => applyFormatting("size", s)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", fontSize: 12 }}>{s}px</button>
        ))}
        <div style={{ position: "relative" }}>
          <button onClick={() => setTableMenuOpen(tableMenuOpen === target ? null : target)} style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>📊<span style={{ fontWeight: 700 }}>Table</span></button>
          {tableMenuOpen === target && (
            <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme?.panel, border: `1px solid ${theme?.border}`, borderRadius: 10, boxShadow: theme?.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
              {tableTemplates.map((tpl) => (
                <button key={tpl.key} onClick={() => {
                  if (editorInstance) {
                    editorInstance.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run();
                    setTableMenuOpen(null);
                    setSelectionInfo({ text: "", start: 0, end: 0, target: null });
                  } else {
                    insertTableTemplate(target, tpl.text);
                  }
                }} style={{ width: "100%", textAlign: "left", padding: 8, borderRadius: 8, border: `1px solid ${theme?.border}`, backgroundColor: theme?.bg, color: theme?.text, cursor: "pointer", marginBottom: 6, fontSize: 12 }}>
                  <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {quickColors.map((c) => (
        <button key={c} onClick={() => applyColorToSelection(c)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme?.border}`, backgroundColor: c, cursor: "pointer" }} />
      ))}
      <input type="color" value={selectionCustomColor} onChange={(e) => setSelectionCustomColor(e.target.value)} style={{ width: 32, height: 32, padding: 2, borderRadius: 8, border: `1px solid ${theme?.border}`, cursor: "pointer" }} />
      <button onClick={() => applyColorToSelection(selectionCustomColor)} style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>OK</button>
      <button onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }} style={{ padding: "6px 8px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>✖</button>
    </div>
  );
}
